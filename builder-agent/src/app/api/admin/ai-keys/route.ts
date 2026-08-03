import { NextResponse } from 'next/server';
import { adminSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await adminSupabase.from('ai_keys').select('*').order('id');
    if (error) throw error;
    
    // Map to frontend format
    const mapped = data.map((d: any) => ({
      id: d.id,
      name: d.name,
      key: d.key,
      isDefault: d.is_default,
      status: d.status
    }));

    return NextResponse.json({ providers: mapped });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { providers } = await req.json();
    
    for (const p of providers) {
      const { error } = await adminSupabase.from('ai_keys').upsert({
        id: p.id,
        name: p.name,
        key: p.key,
        is_default: p.isDefault,
        status: p.status,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
      
      if (error) throw error;
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
