import { NextRequest, NextResponse } from 'next/server';
import { adminSupabase } from '@/lib/supabase';

export interface ApiAuthResult {
  tenantId: string | null;
  error: string | null;
  status: number;
}

export async function verifyApiKey(req: NextRequest): Promise<ApiAuthResult> {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { tenantId: null, error: 'Thiếu API Key hoặc sai định dạng (Yêu cầu: Bearer <API_KEY>)', status: 401 };
  }

  const apiKey = authHeader.split(' ')[1];

  if (!apiKey) {
    return { tenantId: null, error: 'API Key không hợp lệ', status: 401 };
  }

  // Tra cứu bảng tenants bằng adminSupabase (bypass RLS để kiểm tra)
  const { data: tenant, error } = await adminSupabase
    .from('tenants')
    .select('id')
    .eq('developer_api_key', apiKey)
    .single();

  if (error || !tenant) {
    return { tenantId: null, error: 'API Key không chính xác hoặc đã bị vô hiệu hóa', status: 403 };
  }

  return { tenantId: tenant.id, error: null, status: 200 };
}
