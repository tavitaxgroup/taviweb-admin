import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { adminSupabase } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('crm_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const tenantId = decoded.tenant_id;

    if (!tenantId) {
      return NextResponse.json({ error: 'No tenant context' }, { status: 400 });
    }

    // Lấy bookings mới nhất cho tenant này
    const { data: bookings } = await adminSupabase
      .from('booking_appointments')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(5);

    const notifications: any[] = [];
    
    if (bookings) {
      bookings.forEach((b: any) => {
        notifications.push({
          id: `book-${b.id}`,
          title: `Lịch hẹn mới: ${b.customer_name || 'Khách vãng lai'}`,
          message: `Dịch vụ: ${b.service_name || 'Chưa rõ'} | Bắt đầu: ${new Date(b.start_time).toLocaleString('vi-VN')}`,
          created_at: b.created_at,
          time: new Date(b.created_at).getTime(),
          type: 'booking'
        });
      });
    }



    // Sắp xếp theo thời gian mới nhất
    notifications.sort((a, b) => b.time - a.time);

    return NextResponse.json({ notifications });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
