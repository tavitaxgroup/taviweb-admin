import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { BookingService } from '@/modules/booking/api/booking.service';

export async function GET(req: NextRequest) {
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    // Lấy cài đặt giờ mở/đóng cửa
    const settings = await BookingService.getSettings(auth.tenantId!);
    
    // Lấy các lịch đã đặt trong ngày
    const appointments = await BookingService.getAppointments(auth.tenantId!, `${date}T00:00:00.000Z`, `${date}T23:59:59.999Z`);

    // Logic giả lập: Trả về danh sách giờ trống dựa trên opening_time và closing_time
    // (Trong thực tế cần trừ đi các khoảng thời gian đã bị đặt trong appointments)
    
    return NextResponse.json({ 
      date, 
      business_hours: settings,
      booked_slots: appointments.map(a => ({ start: a.start_time, end: a.end_time })),
      message: 'Client tự tính toán giờ trống dựa trên booked_slots và business_hours'
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
