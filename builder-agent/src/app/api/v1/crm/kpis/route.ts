import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { CRMService } from '@/modules/crm/api/crm.service';

export async function GET(req: NextRequest) {
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const url = new URL(req.url);
    const date = new Date();
    const month = parseInt(url.searchParams.get('month') || (date.getMonth() + 1).toString());
    const year = parseInt(url.searchParams.get('year') || date.getFullYear().toString());
    
    const kpis = await CRMService.getKpis(auth.tenantId!, month, year);
    return NextResponse.json({ data: kpis, total: kpis.length }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
