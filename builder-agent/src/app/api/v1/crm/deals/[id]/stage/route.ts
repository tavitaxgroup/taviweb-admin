import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { CRMService } from '@/modules/crm/api/crm.service';

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    if (!body.stage_id) {
      return NextResponse.json({ error: 'Thiếu stage_id' }, { status: 400 });
    }

    await CRMService.updateDealStage(auth.tenantId!, params.id, body.stage_id);

    return NextResponse.json({ message: 'Cập nhật trạng thái thành công' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
