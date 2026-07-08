import { supabase } from './supabase';

export async function getLeadById(id: string) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('place_id', id)
    .single();

  if (error || !data) {
    return null;
  }
  
  return data;
}

export async function getAllLeads() {
  let allData: any[] = [];
  let from = 0;
  const limit = 1000;
  
  while (true) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, from + limit - 1);

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
