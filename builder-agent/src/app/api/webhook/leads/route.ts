import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tenant_id = searchParams.get('tenant');

    if (!tenant_id) {
      return NextResponse.json({ error: 'Missing tenant in URL parameters (e.g. ?tenant=YOUR_TENANT_ID)' }, { status: 400 });
    }

    const payload = await req.json();
    const { name, phone, email, source, ...customData } = payload;

    if (!name && !phone) {
      return NextResponse.json({ error: 'Payload must include at least name or phone' }, { status: 400 });
    }

    const leadName = name || (phone ? `Khách hàng mới (${phone})` : 'Khách hàng mới');

    // 1. Check if tenant exists
    const { data: tenantData, error: tErr } = await supabase
      .from('crm_users')
      .select('tenant_id')
      .eq('tenant_id', tenant_id)
      .limit(1);

    if (tErr || !tenantData || tenantData.length === 0) {
      return NextResponse.json({ error: 'Invalid tenant_id' }, { status: 401 });
    }

    // 2. Get the first pipeline for this tenant
    const { data: pipelines, error: pErr } = await supabase
      .from('crm_pipelines')
      .select('id')
      .eq('tenant_id', tenant_id)
      .order('created_at', { ascending: true })
      .limit(1);

    if (pErr || !pipelines || pipelines.length === 0) {
      return NextResponse.json({ error: 'Tenant has no pipelines configured' }, { status: 400 });
    }
    const pipelineId = pipelines[0].id;

    // 3. Get the first stage of that pipeline
    const { data: stages, error: sErr } = await supabase
      .from('crm_stages')
      .select('id')
      .eq('pipeline_id', pipelineId)
      .order('order', { ascending: true })
      .limit(1);

    if (sErr || !stages || stages.length === 0) {
      return NextResponse.json({ error: 'Pipeline has no stages configured' }, { status: 400 });
    }
    const stageId = stages[0].id;

    // 4. Create contact
    const { data: contact, error: cErr } = await supabase
      .from('crm_contacts')
      .insert({
        tenant_id,
        name: leadName,
        phone: phone || null,
        email: email || null,
        source: source || 'Webhook/API'
      })
      .select()
      .single();

    if (cErr) throw cErr;

    // 5. Create deal
    const { data: deal, error: dErr } = await supabase
      .from('crm_deals')
      .insert({
        tenant_id,
        contact_id: contact.id,
        stage_id: stageId,
        title: `Deal: ${leadName}`,
        value: 0,
        custom_data: customData
      })
      .select()
      .single();

    if (dErr) throw dErr;

    return NextResponse.json({ success: true, deal_id: deal.id, contact_id: contact.id });

  } catch (err: any) {
    console.error('Webhook Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
