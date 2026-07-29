import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email và mật khẩu là bắt buộc' }, { status: 400 });
    }

    // Lấy thông tin user từ DB
    const { data: user, error } = await supabase
      .from('crm_users')
      .select('id, name, email, role, password_hash, tenant_id')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Tài khoản không tồn tại' }, { status: 401 });
    }

    if (!user.password_hash) {
       return NextResponse.json({ error: 'Tài khoản chưa được cấu hình mật khẩu' }, { status: 401 });
    }

    // Kiểm tra mật khẩu
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Mật khẩu không chính xác' }, { status: 401 });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name, tenant_id: user.tenant_id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set HTTP-only Cookie
    const cookieStore = await cookies();
    cookieStore.set('crm_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, tenant_id: user.tenant_id }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ nội bộ' }, { status: 500 });
  }
}
