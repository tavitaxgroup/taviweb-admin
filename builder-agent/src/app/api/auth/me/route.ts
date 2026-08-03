import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('crm_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Không tìm thấy phiên đăng nhập' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Lấy thông tin user TƯƠI từ Database kèm theo quyền (để lỡ đổi quyền thì cập nhật luôn)
    const { data: user, error } = await supabase
      .from('crm_users')
      .select('id, name, email, role, role_id, tenant_id, role_data:crm_roles(*), tenant:tenants(slug, template_key)')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
       return NextResponse.json({ error: 'Tài khoản không tồn tại' }, { status: 401 });
    }

    // Handle role_data which might be an array or object depending on Supabase mapping
    const roleData = Array.isArray(user.role_data) ? user.role_data[0] : user.role_data;

    // Gắn permissions vào object user trả về cho client
    const userData = {
       ...user,
       permissions: roleData?.permissions || [],
       role_data: roleData
    };

    return NextResponse.json({ user: userData });
  } catch (error) {
    return NextResponse.json({ error: 'Phiên đăng nhập hết hạn hoặc không hợp lệ' }, { status: 401 });
  }
}
