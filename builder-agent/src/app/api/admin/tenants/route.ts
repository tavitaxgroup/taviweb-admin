import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { name, slug, templateKey, modules } = await request.json();

    if (!name || !slug) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    // 1. Insert into tenants
    const { data: tenantData, error: tenantError } = await supabase
      .from('tenants')
      .insert([
        {
          name,
          slug,
          template_key: templateKey,
          active_modules: modules,
          contact_info: { phone: '', email: '' }
        }
      ])
      .select()
      .single();

    if (tenantError) {
      return NextResponse.json({ error: 'Lỗi tạo khách hàng: ' + tenantError.message }, { status: 500 });
    }

    // 2. Hash default password
    const plainPassword = 'admin'; // Default password for new tenants
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    const adminEmail = `admin@${slug}.com`;

    // 3. Create Tenant Admin User
    const { error: userError } = await supabase
      .from('crm_users')
      .insert([
        {
          email: adminEmail,
          password_hash: passwordHash,
          name: `Quản trị viên (${name})`,
          role: 'admin', // Role is 'admin' (tenant_admin in context of tenant_id)
          tenant_id: tenantData.id
        }
      ]);

    if (userError) {
      // Rollback tenant creation could be done here, but ignoring for prototype simplicity
      return NextResponse.json({ error: 'Lỗi tạo tài khoản quản trị: ' + userError.message }, { status: 500 });
    }

    // 4. Return success with credentials
    return NextResponse.json({
      success: true,
      tenant: tenantData,
      credentials: {
        email: adminEmail,
        password: plainPassword
      }
    });

  } catch (error: any) {
    console.error('Create Tenant Error:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ nội bộ' }, { status: 500 });
  }
}
