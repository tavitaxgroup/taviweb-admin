import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { adminSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    
    if (!body.url || !body.events) {
      return NextResponse.json({ error: 'Missing required fields (url, events)' }, { status: 400 });
    }

    // Store webhooks in tenant's theme_config (or a dedicated table if available)
    const { data: tenant } = await adminSupabase.from('tenants').select('theme_config').eq('id', auth.tenantId).single();
    
    const currentConfig = tenant?.theme_config || {};
    const webhooks = currentConfig.webhooks || [];
    
    webhooks.push({
      id: crypto.randomUUID(),
      url: body.url,
      events: body.events, // e.g. ['deal.created', 'deal.updated']
      created_at: new Date().toISOString()
    });

    const newConfig = { ...currentConfig, webhooks };
    await adminSupabase.from('tenants').update({ theme_config: newConfig }).eq('id', auth.tenantId);

    return NextResponse.json({ message: 'Webhook registered successfully', data: { url: body.url, events: body.events } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
