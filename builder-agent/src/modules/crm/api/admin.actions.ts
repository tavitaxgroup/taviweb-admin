'use server';

import { supabase, adminSupabase } from '@/lib/supabase';
import { CRMService } from './crm.service';
import crypto from 'crypto';

export async function getProductsAction(tenantId: string) {
  return await CRMService.getProducts(tenantId);
}

export async function createProductAction(tenantId: string, product: any) {
  return await CRMService.createProduct(tenantId, product);
}

export async function updateProductAction(tenantId: string, productId: string, data: any) {
  return await CRMService.updateProduct(tenantId, productId, data);
}

export async function deleteProductAction(tenantId: string, productId: string) {
  return await CRMService.deleteProduct(tenantId, productId);
}

export async function getDeveloperKeyAction(tenantId: string) {
  const { data, error } = await adminSupabase
    .from('tenants')
    .select('developer_api_key')
    .eq('id', tenantId)
    .single();
  
  if (error) throw error;
  return data?.developer_api_key;
}

export async function regenerateDeveloperKeyAction(tenantId: string) {
  // Tạo 1 key ngẫu nhiên dạng: tavi_live_...
  const newKey = `tavi_live_${crypto.randomBytes(16).toString('hex')}`;
  
  const { error } = await adminSupabase
    .from('tenants')
    .update({ developer_api_key: newKey })
    .eq('id', tenantId);
    
  if (error) throw error;
  return newKey;
}

