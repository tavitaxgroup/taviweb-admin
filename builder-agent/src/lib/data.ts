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
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    return [];
  }
  
  return data;
}
