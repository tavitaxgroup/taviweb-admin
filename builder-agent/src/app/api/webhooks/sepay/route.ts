import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const SEPAY_SECRET_KEY = process.env.SEPAY_SECRET_KEY;

export async function POST(req: Request) {
  try {
    // 1. Xác thực HMAC / Authorization Header
    const authHeader = req.headers.get('authorization');
    if (SEPAY_SECRET_KEY && authHeader !== `Apikey ${SEPAY_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    console.log('Received SePay Webhook:', body);

    const { transferAmount, content, transferType } = body;

    // Chỉ xử lý tiền vào
    if (transferType !== 'in' && transferAmount > 0) {
      return NextResponse.json({ success: true, message: 'Ignored non-inward transaction' });
    }

    // 2. Tìm mã giao dịch trong nội dung chuyển khoản
    const words = (content || '').toUpperCase().split(/[^A-Z0-9]/);
    const transactionCode = words.find((w: string) => w.startsWith('TVW') && w.length >= 7);

    if (!transactionCode) {
      return NextResponse.json({ success: true, message: 'No matching transaction code found in content' });
    }

    // 3. Sử dụng Atomic Update để đảm bảo Idempotency
    // Cập nhật status thành SUCCESS chỉ khi nó đang PENDING.
    // Nếu nó đã SUCCESS rồi (bị gọi webhook 2 lần) thì sẽ trả về data rỗng
    const { data: updatedTxList, error: updateError } = await supabase
      .from('transactions')
      .update({ status: 'SUCCESS' })
      .eq('transaction_code', transactionCode)
      .eq('status', 'pending')
      .gte('amount', transferAmount) // Chỉ update nếu khách chuyển đủ hoặc thừa tiền
      .select('*');

    if (updateError) {
      console.error('Webhook DB Error:', updateError);
      return NextResponse.json({ error: 'Database Error' }, { status: 500 });
    }

    if (!updatedTxList || updatedTxList.length === 0) {
      // Giao dịch không tồn tại, sai số tiền, hoặc đã được xử lý (Idempotency)
      console.log('Transaction not found, insufficient amount, or already processed:', transactionCode);
      return NextResponse.json({ success: true, message: 'Idempotency/Validation check passed' });
    }

    const transaction = updatedTxList[0];

    // 4. Lấy thông tin Package
    const { data: packageData } = await supabase
      .from('packages')
      .select('id, added_quota')
      .eq('id', transaction.package_id)
      .single();

    const addedQuota = packageData?.added_quota || 0;

    // 5. Cập nhật Tenant (Reset Token và thiết lập thời hạn)
    const durationMonths = transaction.duration_months || 1;
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + durationMonths);
    const packageExpiresAt = expiresAt.toISOString();

    await supabase
      .from('tenants')
      .update({ 
        ai_quota: addedQuota, // Reset token
        ai_used: 0,           // Reset mức sử dụng
        package_id: transaction.package_id,
        package_expires_at: packageExpiresAt
      })
      .eq('id', transaction.tenant_id);

    // 6. Ghi Audit Log (Fire and forget, không await nếu không cần)
    supabase.from('audit_logs').insert({
      tenant_id: transaction.tenant_id,
      actor_type: 'webhook',
      action: 'package_upgraded',
      payload: { transaction_code: transactionCode, package_id: transaction.package_id, amount: transferAmount }
    }).then();

    console.log(`Successfully upgraded tenant ${transaction.tenant_id} with package ${transaction.package_id}`);
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('SePay Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
