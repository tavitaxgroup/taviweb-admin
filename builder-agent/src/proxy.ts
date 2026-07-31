import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getTenantStatus } from './lib/redis/tenantCache';
import { globalRateLimiter } from './lib/redis/rateLimiter';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass public static assets and auth routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/webhooks') ||
    pathname.startsWith('/api/cron')
  ) {
    return NextResponse.next();
  }

  // 2. Global Rate Limiting for public API endpoints
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success, limit, reset, remaining } = await globalRateLimiter.limit(ip);
    if (!success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }
  }

  // 3. Auth Guard cho các route bảo vệ (/admin, /crm, hoặc API private)
  if (pathname.startsWith('/admin') || pathname.startsWith('/crm') || pathname.startsWith('/api/admin')) {
    if (pathname.includes('/login')) {
      return NextResponse.next();
    }

    const token = request.cookies.get('crm_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/crm/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      const tenantId = payload.tenant_id as string;

      if (!tenantId) {
        return NextResponse.redirect(new URL('/admin/crm/login', request.url));
      }

      // 4. Kiểm tra Tenant Status cache ở Redis
      const tenant = await getTenantStatus(tenantId);
      
      if (!tenant) {
        // Tenant không tồn tại
        const res = NextResponse.redirect(new URL('/admin/crm/login', request.url));
        res.cookies.delete('crm_token');
        return res;
      }

      // 5. Bỏ qua kiểm tra thời hạn gói ở middleware, để UI tự xử lý Upgrade Modal
      // if (tenant.isExpired && !pathname.startsWith('/admin/billing')) {
      //   return NextResponse.redirect(new URL('/admin/billing', request.url));
      // }

      // Clone request headers và set X-Tenant-ID
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-tenant-id', tenantId);
      requestHeaders.set('x-user-id', payload.id as string);
      requestHeaders.set('x-user-role', payload.role as string);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      // Token invalid hoặc expired
      const res = NextResponse.redirect(new URL('/admin/crm/login', request.url));
      res.cookies.delete('crm_token');
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
