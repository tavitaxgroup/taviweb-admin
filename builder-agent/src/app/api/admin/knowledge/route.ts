import { NextResponse } from 'next/server';
import { adminSupabase } from '@/lib/supabase';
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

// GET: Lấy danh sách các chunk kiến thức
export async function GET(request: Request) {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await adminSupabase
      .from('knowledge_chunks')
      .select('id, content, source_type, created_at')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Xóa 1 chunk kiến thức
export async function DELETE(request: Request) {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const sourceType = url.searchParams.get('source_type');
    
    if (!id && !sourceType) return NextResponse.json({ error: 'Missing chunk ID or source_type' }, { status: 400 });

    let query = adminSupabase.from('knowledge_chunks').delete().eq('tenant_id', tenantId);
    
    if (id) {
      query = query.eq('id', id);
    }
    if (sourceType) {
      query = query.eq('source_type', sourceType);
    }

    const { error } = await query;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
