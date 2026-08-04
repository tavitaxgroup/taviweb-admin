import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { BookingService } from '@/modules/booking/api/booking.service';

export async function POST(req: NextRequest) {
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    
    if (!body.customer_name || !body.start_time || !body.end_time) {
      return NextResponse.json({ error: 'Missing required fields (customer_name, start_time, end_time)' }, { status: 400 });
    }

    const appointment = await BookingService.createAppointment(auth.tenantId!, {
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      service_id: body.service_id,
      service_name: body.service_name,
      start_time: body.start_time,
      end_time: body.end_time,
      resource_id: body.resource_id, // optional
      notes: body.notes,
      status: 'pending'
    });

    return NextResponse.json({ message: 'Appointment created successfully', data: appointment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
