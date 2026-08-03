import { NextResponse } from 'next/server';
import { ingestKnowledge } from '@/lib/ai/ingestion';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

async function getTenantId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded.tenant_id;
  } catch (err) {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { content, source_type = 'custom' } = await request.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Nội dung không hợp lệ' }, { status: 400 });
    }

    // Tiến hành chunking và embedding thông qua hàm ingestKnowledge
    const result = await ingestKnowledge(tenantId, content, source_type);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, chunksCount: result.chunksCount });
  } catch (err: any) {
    console.error('Ingest API Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
