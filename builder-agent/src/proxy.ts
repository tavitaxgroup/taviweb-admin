import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getTenantStatus } from './lib/redis/tenantCache';
import { globalRateLimiter } from './lib/redis/rateLimiter';
import { createClient } from '@supabase/supabase-js';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!, {
  auth: { persistSession: false },
});

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const hostname = request.headers
    .get('host')!
    .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    .replace('localhost:3000', process.env.NEXT_PUBLIC_ROOT_DOMAIN || '');

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

  // Handle Custom Domains FIRST (before Auth Guard, because public sites use custom domains)
  const isSystemDomain = 
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN || 
    hostname === 'localhost' || 
    hostname.includes('vercel.app');

  if (!isSystemDomain && !pathname.startsWith('/api/') && !pathname.startsWith('/admin')) {
    try {
      const { data: tenant } = await supabase
        .from('tenants')
        .select('slug')
        .eq('custom_domain', hostname)
        .single();

      if (tenant && tenant.slug) {
        const searchParams = request.nextUrl.searchParams.toString();
        const path = `${pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
        return NextResponse.rewrite(new URL(`/${tenant.slug}${path}`, request.url));
      }
    } catch (error) {
      console.error('Middleware Custom Domain Error:', error);
    }
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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
