import { NextResponse } from 'next/server';
import { adminSupabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

async function getTenantId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded.tenant_id;
  } catch (err) {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const tenantId = await getTenantId();
    
    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { custom_domain } = await request.json();

    // Loại bỏ http/https và www nếu khách nhập vào
    const cleanDomain = custom_domain 
      ? custom_domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]
      : null;

    // --- LOGIC GỌI VERCEL API ĐỂ GẮN DOMAIN ---
    // Yêu cầu phải có biến môi trường VERCEL_PROJECT_ID và VERCEL_API_TOKEN
    const vercelProjectId = process.env.VERCEL_PROJECT_ID;
    const vercelToken = process.env.VERCEL_API_TOKEN;

    if (cleanDomain && vercelProjectId && vercelToken) {
      // Gọi API thêm Domain vào Vercel Project
      const vercelRes = await fetch(`https://api.vercel.com/v9/projects/${vercelProjectId}/domains`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vercelToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: cleanDomain })
      });

      if (!vercelRes.ok) {
        const errorData = await vercelRes.json();
        // Bỏ qua lỗi nếu domain đã được add từ trước (error code: domain_already_in_use)
        if (errorData.error?.code !== 'domain_already_in_use') {
          console.error('Vercel API Error:', errorData);
          return NextResponse.json({ error: 'Không thể cấu hình tên miền trên Vercel: ' + errorData.error?.message }, { status: 400 });
        }
      }
    }

    // Cập nhật Database
    const { error: dbError } = await adminSupabase
      .from('tenants')
      .update({ custom_domain: cleanDomain })
      .eq('id', tenantId);

    if (dbError) {
      // Nếu lỗi Unique constraint
      if (dbError.code === '23505') {
         return NextResponse.json({ error: 'Tên miền này đã được sử dụng bởi gian hàng khác' }, { status: 409 });
      }
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, domain: cleanDomain });

  } catch (error: any) {
    console.error('Domain Settings Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
