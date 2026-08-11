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

export async function POST(request: Request) {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = file.name.split('.').pop();
    const safeFilename = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
    const filePath = `${tenantId}/${safeFilename}`;

    const { error } = await adminSupabase.storage
      .from('media')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
       console.error("Storage upload failed:", error);
       return NextResponse.json({ error: 'Failed to upload to storage: ' + error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = adminSupabase.storage.from('media').getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl }, { status: 201 });
  } catch (error: any) {
    console.error('Error in upload:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
