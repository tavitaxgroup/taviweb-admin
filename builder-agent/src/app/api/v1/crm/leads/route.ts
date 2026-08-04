import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { CRMService } from '@/modules/crm/api/crm.service';

export async function GET(req: NextRequest) {
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    // Tạm mượn getDeals để lấy contacts (trong thực tế có thể gọi hàm getContacts riêng)
    const deals = await CRMService.getDeals(auth.tenantId!);
    const leads = deals.map(d => d.contact).filter(c => c).filter((v: any, i, a) => a.findIndex((t: any) => t?.id === v?.id) === i);
    
    return NextResponse.json({ data: leads, total: leads.length }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: 'Thiếu name hoặc phone' }, { status: 400 });
    }

    // Tạo Deal mặc định khi có Contact mới từ API
    const newDeal = await CRMService.createDealAndContact(
      auth.tenantId!,
      {
        name: body.name,
        phone: body.phone,
        email: body.email || '',
        source: body.source || 'API Integration',
      },
      {
        title: body.deal_title || `Cơ hội từ ${body.name}`,
        value: body.deal_value || 0,
        stage_id: body.stage_id // Nếu không có thì mặc định stage đầu tiên (CRMService tự xử lý hoặc báo lỗi nếu bắt buộc)
      }
    );

    return NextResponse.json({ message: 'Tạo khách hàng & cơ hội thành công', data: newDeal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
