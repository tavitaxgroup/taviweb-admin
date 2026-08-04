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
    const entityType = (url.searchParams.get('type') || 'deal') as 'deal' | 'contact';
    
    const customFields = await CRMService.getCustomFields(auth.tenantId!, entityType);
    return NextResponse.json({ data: customFields, total: customFields.length }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
