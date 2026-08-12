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
    const resourceId = searchParams.get('resourceId');

    // Lấy cài đặt giờ mở/đóng cửa
    const settings = await BookingService.getSettings(auth.tenantId!);
    
    // Lấy các lịch đã đặt trong ngày
    let query = supabase
      .from('booking_appointments')
      .select('*')
      .eq('tenant_id', auth.tenantId!)
      .gte('start_time', `${date}T00:00:00.000Z`)
      .lt('start_time', `${date}T23:59:59.999Z`)
      .neq('status', 'cancelled');
      
    if (resourceId) {
      query = query.eq('resource_id', resourceId);
    }
    
    const { data: appointments } = await query;

    return NextResponse.json({ 
      date, 
      business_hours: settings,
      booked_slots: (appointments || []).map(a => ({ start: a.start_time, end: a.end_time })),
      message: 'Client tự tính toán giờ trống dựa trên booked_slots và business_hours'
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
