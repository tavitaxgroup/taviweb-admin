import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { adminSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const tenantSlug = 'boss-tenant';
    const email = 'boss@taviweb.com';
    const password = 'boss';

    // 1. Kiểm tra hoặc tạo Tenant
    let { data: tenant } = await adminSupabase
      .from('tenants')
      .select('id')
      .eq('slug', tenantSlug)
      .single();

    if (!tenant) {
      const { data: newTenant, error: tenantError } = await adminSupabase
        .from('tenants')
        .insert([{
          name: 'Công ty của Sếp',
          slug: tenantSlug,
          domain: `${tenantSlug}.taviweb.com`,
          status: 'active',
          ai_quota: 100,
          ai_used: 0,
          active_modules: ['crm', 'booking']
        }])
        .select()
        .single();

      if (tenantError) throw new Error(`Lỗi tạo tenant: ${tenantError.message}`);
      tenant = newTenant;
    }

    // 2. Kiểm tra hoặc tạo User
    const { data: existingUser } = await adminSupabase
      .from('crm_users')
      .select('id')
      .eq('email', email)
      .single();

    if (!existingUser) {
      const passwordHash = await bcrypt.hash(password, 10);
      const { error: userError } = await adminSupabase
        .from('crm_users')
        .insert([{
          email,
          password: password,
          password_hash: passwordHash,
          name: 'Sếp Tổng',
          role: 'staff', // staff role để ẩn các tính năng admin/cài đặt
          tenant_id: tenant.id,
          status: 'active'
        }]);

      if (userError) throw new Error(`Lỗi tạo user: ${userError.message}`);
    } else {
      // Nếu user đã tồn tại, update lại password và role cho chắc
      const passwordHash = await bcrypt.hash(password, 10);
      await adminSupabase
        .from('crm_users')
        .update({ password_hash: passwordHash, password, role: 'staff', tenant_id: tenant.id })
        .eq('email', email);
    }

    return NextResponse.json({
      success: true,
      message: 'Tạo tài khoản test thành công',
      account: {
        email,
        password
      }
    });
  } catch (error: any) {
    console.error('Setup Boss Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
