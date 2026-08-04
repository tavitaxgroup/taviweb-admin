import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { adminSupabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    // In TaviWeb, products might be in booking_services or a separate crm_products table.
    // For now, we fetch from booking_services as a unified product/service catalog.
    const { data, error } = await adminSupabase
      .from('booking_services')
      .select('id, name, description, price, duration_minutes, created_at')
      .eq('tenant_id', auth.tenantId!);
      
    if (error) throw error;
    
    return NextResponse.json({ data: data || [], total: (data || []).length }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
