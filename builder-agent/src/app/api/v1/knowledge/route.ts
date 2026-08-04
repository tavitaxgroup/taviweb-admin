import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { ingestKnowledge } from '@/lib/ai/ingestion';

export async function POST(req: NextRequest) {
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    
    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json({ error: 'Thiếu content (văn bản cần đưa vào cho AI học)' }, { status: 400 });
    }

    const sourceType = body.source_type || 'api_integration';
    
    const result = await ingestKnowledge(auth.tenantId!, body.content, sourceType);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Đã đưa kiến thức vào hệ thống thành công', 
      chunks_created: result.chunksCount 
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
