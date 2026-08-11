import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Using normal client, might need service role if RLS blocks public inserts

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Find the root tenant (assumed to be the first tenant created or a specific slug)
    // We will look for a tenant with slug 'taviweb' first, otherwise grab the oldest tenant.
    let { data: tenant } = await supabase
      .from('tenants')
      .select('id')
      .eq('slug', 'taviweb')
      .single();

    if (!tenant) {
      const { data: firstTenant } = await supabase
        .from('tenants')
        .select('id')
        .order('created_at', { ascending: true })
        .limit(1)
        .single();
      tenant = firstTenant;
    }

    if (!tenant) {
      return NextResponse.json({ error: 'System not initialized (no tenant found)' }, { status: 500 });
    }

    const tenantId = tenant.id;

    // 2. Automations: CRM Integration
    let contactId = null;
    if (body.phone) {
      // Find or create Contact by Phone
      const { data: existingContact } = await supabase
        .from('crm_contacts')
        .select('id')
        .eq('tenant_id', tenantId)
        .eq('phone', body.phone)
        .single();
        
      if (existingContact) {
        contactId = existingContact.id;
      } else {
        const { data: newContact } = await supabase
          .from('crm_contacts')
          .insert([{
            tenant_id: tenantId,
            name: body.name || 'Khách chưa có tên',
            phone: body.phone
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

      const dealTitle = body.name ? `Yêu cầu từ: ${body.name}` : `Liên hệ mới: ${body.phone}`;

      const { data: deal } = await supabase
        .from('crm_deals')
        .insert([{
          tenant_id: tenantId,
          contact_id: contactId,
          title: dealTitle,
          value: 0,
          stage_id: stageId,
          custom_data: {
            'Nguồn': 'Website TaviWeb',
            'Dịch vụ': body.service || 'Chưa rõ',
            'Ghi chú': body.message || ''
          }
        }])
        .select()
        .single();

      if (deal) {
        // Log Activity
        await supabase.from('crm_activities').insert([{
          deal_id: deal.id,
          type: 'note',
          content: `🎯 Hệ thống: Khách hàng điền form liên hệ trên Landing Page.
Dịch vụ: ${body.service || 'Chưa rõ'}`
        }]);
      }
    }

    return NextResponse.json({ success: true, message: 'Đã nhận thông tin' });
  } catch (error: any) {
    console.error('Submit Lead Error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
