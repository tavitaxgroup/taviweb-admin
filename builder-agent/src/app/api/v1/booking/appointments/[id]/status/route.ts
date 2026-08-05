import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { BookingService } from '@/modules/booking/api/booking.service';

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyApiKey(request);
    if (auth.error || !auth.tenantId) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: auth.status || 401 });
    }

    const { id } = await props.params;

    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    await BookingService.updateAppointmentStatus(auth.tenantId, id, status);

    return NextResponse.json({
      success: true,
      message: 'Cập nhật trạng thái lịch hẹn thành công',
      data: { id, status }
    });
  } catch (error: any) {
    console.error('Error updating appointment status:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
