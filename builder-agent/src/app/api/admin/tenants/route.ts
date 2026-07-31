import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { name, slug, templateKey, modules, packageId, durationMonths } = await request.json();

    if (!name || !slug) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    // Prepare package info
    let aiQuota = 0;
    let packageExpiresAt = null;
    let finalPackageId = null;

    if (packageId) {
      // Fetch the package details
      const { data: pkgData } = await supabase.from('packages').select('added_quota').eq('id', packageId).single();
      if (pkgData) {
        aiQuota = pkgData.added_quota;
        finalPackageId = packageId;
        
        // Calculate expiration date
        const expires = new Date();
        expires.setMonth(expires.getMonth() + (durationMonths || 1));
        packageExpiresAt = expires.toISOString();
      }
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
          contact_info: { phone: '', email: '' },
          package_id: finalPackageId,
          ai_quota: aiQuota,
          ai_used: 0,
          package_expires_at: packageExpiresAt
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
          role: 'admin',
          tenant_id: tenantData.id
        }
      ]);

    if (userError) {
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
