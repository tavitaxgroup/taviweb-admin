import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { CRMService } from '@/modules/crm/api/crm.service';

export async function GET(req: NextRequest) {
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const deals = await CRMService.getDeals(auth.tenantId!);
    return NextResponse.json({ data: deals, total: deals.length }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
