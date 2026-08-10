import { supabase } from './supabase';

export async function getLeadById(tenantId: string, id: string, isSuperAdmin: boolean = false, saleId?: string) {
  if (!isSuperAdmin && !saleId) return null;
  
  let query = supabase
    .from('leads')
    .select('*')
    .eq('place_id', id);
    
  if (!isSuperAdmin && saleId) {
    query = query.eq('assigned_to', saleId);
  }

  const { data, error } = await query.single();

  if (error || !data) {
    return null;
  }
  
  return data;
}

export async function getAllLeads(tenantId: string, isSuperAdmin: boolean = false, saleId?: string) {
  if (!isSuperAdmin && !saleId) {
    return []; // Tài khoản thường không được xem kho Leads tổng
  }

  let allData: any[] = [];
  let from = 0;
  const limit = 1000;
  
  while (true) {
    let query = supabase
      .from('leads')
      .select('*, assigned_to')
      .order('created_at', { ascending: false })
      .range(from, from + limit - 1);
      
    if (!isSuperAdmin && saleId) {
      query = query.eq('assigned_to', saleId);
    }

    const { data, error } = await query;

    if (error || !data) {
      break;
    }
    
    allData = [...allData, ...data];
    
    if (data.length < limit) {
      break;
    }
    from += limit;
  }

  return allData;
}
