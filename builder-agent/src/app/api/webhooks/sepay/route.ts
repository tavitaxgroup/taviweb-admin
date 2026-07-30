import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
const SEPAY_SECRET_KEY = process.env.SEPAY_SECRET_KEY;

export async function POST(req: Request) {
  try {
    // 1. XÃ¡c thá»±c báº£o máº­t (tuá»³ chá»n theo chuáº©n cá»§a SePay)
    // CÃ³ thá»ƒ kiá»ƒm tra header Authorization náº¿u cÃ³ cáº¥u hÃ¬nh trÃªn SePay Dashboard
    // const authHeader = req.headers.get('authorization');
    // if (authHeader !== `Apikey ${SEPAY_SECRET_KEY}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await req.json();
    console.log('Received SePay Webhook:', body);

    // SePay Payload: { transferAmount: 399000, content: "TVW1234ABCD ...", transferType: "in" }
    const { transferAmount, content, transferType } = body;

    // Chá»‰ xá»­ lÃ½ tiá»n vÃ o
    if (transferType !== 'in' && transferAmount > 0) {
      return NextResponse.json({ success: true, message: 'Ignored non-inward transaction' });
    }

    // 2. TÃ¬m mÃ£ giao dá»‹ch trong ná»™i dung chuyá»ƒn khoáº£n
    // Format mÃ£ cá»§a chÃºng ta lÃ  TVW[8chars][4chars] -> Ä‘á»™ dÃ i 15 chars (e.g. TVW8EBAF72BA4B2)
    // TÃ¡ch cÃ¡c tá»« trong ná»™i dung ra vÃ  tÃ¬m chuá»—i báº¯t Ä‘áº§u báº±ng TVW
    const words = (content || '').toUpperCase().split(/[^A-Z0-9]/);
    const transactionCode = words.find((w: string) => w.startsWith('TVW') && w.length >= 7);

    if (!transactionCode) {
      return NextResponse.json({ success: true, message: 'No matching transaction code found in content' });
    }

    // 3. TÃ¬m giao dá»‹ch trong Database
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .select('*')
      .eq('transaction_code', transactionCode)
      .eq('status', 'PENDING')
      .single();

    if (txError || !transaction) {
      console.log('Transaction not found or already processed:', transactionCode);
      return NextResponse.json({ success: true, message: 'Transaction not found or already processed' });
    }

    // 4. Kiá»ƒm tra sá»‘ tiá»n
    if (Number(transferAmount) < Number(transaction.amount)) {
      console.log('Insufficient amount for transaction:', transactionCode);
      return NextResponse.json({ success: true, message: 'Insufficient amount' });
    }

    // 5. Cáº­p nháº­t tráº¡ng thÃ¡i Giao dá»‹ch thÃ nh SUCCESS
    const { error: updateTxError } = await supabase
      .from('transactions')
      .update({ status: 'SUCCESS' })
      .eq('id', transaction.id);

    if (updateTxError) {
      throw updateTxError;
    }

    // 6. Quy đổi Hạn mức AI Token theo Gói (Từ DB)
    const { data: packageData } = await supabase
      .from('packages')
      .select('added_quota')
      .eq('name', transaction.package_name)
      .single();

    const addedQuota = packageData?.added_quota || 0;

    // 7. Cáº­p nháº­t Tenant (Ghi Ä‘Ã¨ hoáº·c Cá»™ng dá»“n - á»Ÿ Ä‘Ã¢y ta cá»™ng dá»“n)
    // Ä áº§u tiÃªn láº¥y quota hiá»‡n táº¡i
    const { data: tenant } = await supabase
      .from('tenants')
      .select('ai_quota')
      .eq('id', transaction.tenant_id)
      .single();
      
    const currentQuota = tenant?.ai_quota || 0;

    const { error: updateTenantError } = await supabase
      .from('tenants')
      .update({ 
        ai_quota: currentQuota + addedQuota,
        package_name: transaction.package_name
      })
      .eq('id', transaction.tenant_id);

    if (updateTenantError) {
      throw updateTenantError;
    }

    console.log(`Successfully upgraded tenant ${transaction.tenant_id} with package ${transaction.package_name}`);
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('SePay Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

