import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
);
const SEPAY_SECRET_KEY = process.env.SEPAY_SECRET_KEY;

export async function POST(req: Request) {
  try {
    // 1. Xác thực bảo mật (tuỳ chọn theo chuẩn của SePay)
    // Có thể kiểm tra header Authorization nếu có cấu hình trên SePay Dashboard
    // const authHeader = req.headers.get('authorization');
    // if (authHeader !== `Apikey ${SEPAY_SECRET_KEY}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await req.json();
    console.log('Received SePay Webhook:', body);

    // SePay Payload: { transferAmount: 399000, content: "TVW1234ABCD ...", transferType: "in" }
    const { transferAmount, content, transferType } = body;

    // Chỉ xử lý tiền vào
    if (transferType !== 'in' && transferAmount > 0) {
      return NextResponse.json({ success: true, message: 'Ignored non-inward transaction' });
    }

    // 2. Tìm mã giao dịch trong nội dung chuyển khoản
    // Format mã của chúng ta là TVW[8chars][4chars] -> độ dài 15 chars (e.g. TVW8EBAF72BA4B2)
    // Tách các từ trong nội dung ra và tìm chuỗi bắt đầu bằng TVW
    const words = (content || '').toUpperCase().split(/[^A-Z0-9]/);
    const transactionCode = words.find((w: string) => w.startsWith('TVW') && w.length >= 7);

    if (!transactionCode) {
      return NextResponse.json({ success: true, message: 'No matching transaction code found in content' });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 3. Tìm giao dịch trong Database
    const { data: transaction, error: txError } = await supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('transaction_code', transactionCode)
      .eq('status', 'PENDING')
      .single();

    if (txError || !transaction) {
      console.log('Transaction not found or already processed:', transactionCode);
      return NextResponse.json({ success: true, message: 'Transaction not found or already processed' });
    }

    // 4. Kiểm tra số tiền
    if (Number(transferAmount) < Number(transaction.amount)) {
      console.log('Insufficient amount for transaction:', transactionCode);
      return NextResponse.json({ success: true, message: 'Insufficient amount' });
    }

    // 5. Cập nhật trạng thái Giao dịch thành SUCCESS
    const { error: updateTxError } = await supabaseAdmin
      .from('transactions')
      .update({ status: 'SUCCESS' })
      .eq('id', transaction.id);

    if (updateTxError) {
      throw updateTxError;
    }

    // 6. Quy đổi Hạn mức AI Token theo Gói
    let addedQuota = 0;
    if (transaction.package_name === 'Gói Cơ Bản') addedQuota = 10000;
    else if (transaction.package_name === 'Gói Tiêu Chuẩn') addedQuota = 50000;
    else if (transaction.package_name === 'Gói Nâng Cao') addedQuota = 100000;
    else if (transaction.package_name === 'AI Enterprise') addedQuota = 500000;

    // 7. Cập nhật Tenant (Ghi đè hoặc Cộng dồn - ở đây ta cộng dồn)
    // Đầu tiên lấy quota hiện tại
    const { data: tenant } = await supabaseAdmin
      .from('tenants')
      .select('ai_quota')
      .eq('id', transaction.tenant_id)
      .single();
      
    const currentQuota = tenant?.ai_quota || 0;

    const { error: updateTenantError } = await supabaseAdmin
      .from('tenants')
      .update({ 
        ai_quota: currentQuota + addedQuota
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
