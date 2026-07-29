import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { tenant_id, amount, package_name } = await req.json();

    if (!tenant_id || !amount || !package_name) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Generate a unique transaction code for bank transfer content
    // Format: TVW-[first 8 chars of tenant_id]-[random 4 chars]
    const tenantShort = tenant_id.split('-')[0].toUpperCase();
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const transactionCode = `TVW${tenantShort}${randomStr}`;

    const { data, error } = await supabase
      .from('transactions')
      .insert({
        tenant_id,
        amount,
        package_name,
        transaction_code: transactionCode,
        status: 'PENDING'
      })
      .select()
      .single();

    if (error) {
      console.error('Insert transaction error:', error);
      return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
    }

    return NextResponse.json({ success: true, transaction: data });
  } catch (error) {
    console.error('Checkout Create Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
