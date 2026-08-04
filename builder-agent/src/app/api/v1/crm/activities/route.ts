import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { CRMService } from '@/modules/crm/api/crm.service';

export async function POST(req: NextRequest) {
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    
    if (!body.deal_id || !body.type || !body.content) {
      return NextResponse.json({ error: 'Missing required fields (deal_id, type, content)' }, { status: 400 });
    }

    const activity = await CRMService.createActivity(auth.tenantId!, {
      deal_id: body.deal_id,
      type: body.type, // e.g. 'note', 'call', 'email'
      content: body.content,
      user_id: body.user_id // optional
    });

    return NextResponse.json({ message: 'Activity created successfully', data: activity }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
