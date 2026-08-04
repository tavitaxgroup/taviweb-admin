import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/apiAuth';
import { adminSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const auth = await verifyApiKey(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize filename and create unique path
    const ext = file.name.split('.').pop();
    const safeFilename = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
    const filePath = `${auth.tenantId}/${safeFilename}`;

    // Upload to Supabase Storage
    const { data, error } = await adminSupabase.storage
      .from('media') // Assume 'media' bucket exists
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
       // Fallback for local dev if bucket doesn't exist
       console.error("Storage upload failed (bucket might not exist):", error);
       return NextResponse.json({ error: 'Failed to upload to storage: ' + error.message }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = adminSupabase.storage.from('media').getPublicUrl(filePath);

    return NextResponse.json({ message: 'File uploaded successfully', url: publicUrl }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
