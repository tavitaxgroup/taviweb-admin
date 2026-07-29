import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Important: server-side uses service_role key to bypass RLS for public insertions if needed.
// Wait, currently '@/lib/supabase' is a client. We can just use the regular client, but if RLS prevents inserts we might need service_role. 
// Assuming public insert to booking_appointments and crm_contacts/deals is allowed OR we use service_role.

export async function POST(request: Request, { params }: { params: Promise<{ tenantSlug: string }> }) {
  try {
    const { tenantSlug: tenantId } = await params; // It receives the UUID from frontend
    const body = await request.json();
    
    // 1. Create Booking Appointment
    const { data: appointment, error: appointmentError } = await supabase
      .from('booking_appointments')
      .insert([{
        ...body,
        tenant_id: tenantId
      }])
      .select()
      .single();

    if (appointmentError) throw appointmentError;

    // 2. Automations: CRM Integration
    // Check if CRM module is active for this tenant (we can assume yes for demo, or check config)
    
    try {
      // Find or create Contact by Phone
      let contactId = null;
      if (body.customer_phone) {
        const { data: existingContact } = await supabase
          .from('crm_contacts')
          .select('id')
          .eq('tenant_id', tenantId)
          .eq('phone', body.customer_phone)
          .single();
          
        if (existingContact) {
          contactId = existingContact.id;
        } else {
          const { data: newContact } = await supabase
            .from('crm_contacts')
            .insert([{
              tenant_id: tenantId,
              name: body.customer_name,
              phone: body.customer_phone
            }])
            .select()
            .single();
          contactId = newContact?.id;
        }
      }

      if (contactId) {
        // Create Deal
        // Find default pipeline "Mới (Leads)" stage
        const { data: stages } = await supabase
          .from('crm_stages')
          .select('id')
          .eq('tenant_id', tenantId)
          .order('order', { ascending: true })
          .limit(1);

        const stageId = stages && stages.length > 0 ? stages[0].id : null;

        const { data: deal } = await supabase
          .from('crm_deals')
          .insert([{
            tenant_id: tenantId,
            contact_id: contactId,
            title: `Lịch hẹn: ${body.service_name || 'Dịch vụ'} - ${body.customer_name}`,
            value: 0,
            stage_id: stageId,
            custom_data: {
              'Nguồn': 'Web Booking',
              'Ngày Hẹn': body.start_time
            }
          }])
          .select()
          .single();

        if (deal) {
          // Log Activity
          await supabase.from('crm_activities').insert([{
            deal_id: deal.id,
            type: 'note',
            content: `🎯 Hệ thống: Khách hàng đã đặt lịch hẹn trên Web.
Thời gian: ${new Date(body.start_time).toLocaleString('vi-VN')}
Ghi chú: ${body.notes || 'Không có'}`
          }]);
        }
      }
    } catch (crmError) {
      console.error('CRM Automation Error:', crmError);
      // We don't fail the booking if CRM automation fails
    }

    return NextResponse.json({ success: true, appointment });

  } catch (error: any) {
    console.error('Booking Error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
