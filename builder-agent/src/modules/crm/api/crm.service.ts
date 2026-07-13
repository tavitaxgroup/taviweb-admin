import { supabase } from '@/lib/supabase';
import { CRMUser, CRMPipeline, CRMStage, CRMContact, CRMDeal, CRMActivity } from '../types';

export const CRMService = {
  // Users
  async getUsers(): Promise<CRMUser[]> {
    const { data, error } = await supabase.from('crm_users').select('*').order('name');
    if (error) throw error;
    return data || [];
  },
  async createUser(user: Partial<CRMUser>): Promise<CRMUser> {
    const { data, error } = await supabase.from('crm_users').insert([user]).select().single();
    if (error) throw error;
    return data;
  },

  // Pipeline & Stages
  async getPipelines(): Promise<CRMPipeline[]> {
    const { data, error } = await supabase.from('crm_pipelines').select('*').order('created_at');
    if (error) throw error;
    return data || [];
  },
  async getStages(pipelineId: string): Promise<CRMStage[]> {
    const { data, error } = await supabase.from('crm_stages').select('*').eq('pipeline_id', pipelineId).order('order');
    if (error) throw error;
    return data || [];
  },

  // Deals
  async getDeals(pipelineId: string): Promise<CRMDeal[]> {
    // Để lấy deal theo pipeline, ta cần join qua stage. Supabase cho phép query lồng:
    const { data, error } = await supabase
      .from('crm_deals')
      .select(`
        *,
        contact:crm_contacts(*),
        assignee:crm_users(*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    // Lọc thủ công ra các deal thuộc pipeline nếu cần, hoặc có thể lọc theo ds stageId
    return data || [];
  },
  async updateDealStage(dealId: string, stageId: string): Promise<void> {
    const { error } = await supabase.from('crm_deals').update({ stage_id: stageId }).eq('id', dealId);
    if (error) throw error;
  },
  async createDealAndContact(contact: Partial<CRMContact>, deal: Partial<CRMDeal>): Promise<CRMDeal> {
    // Tạo contact trước
    const { data: newContact, error: cErr } = await supabase.from('crm_contacts').insert([contact]).select().single();
    if (cErr) throw cErr;

    // Tạo deal
    const { data: newDeal, error: dErr } = await supabase.from('crm_deals').insert([{
      ...deal,
      contact_id: newContact.id
    }]).select().single();
    if (dErr) throw dErr;

    return newDeal;
  },
  async deleteDeal(dealId: string): Promise<void> {
    const { error } = await supabase.from('crm_deals').delete().eq('id', dealId);
    if (error) throw error;
  },

  // Activities
  async getActivities(dealId: string): Promise<CRMActivity[]> {
    const { data, error } = await supabase
      .from('crm_activities')
      .select('*, user:crm_users(*)')
      .eq('deal_id', dealId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  async createActivity(activity: Partial<CRMActivity>): Promise<CRMActivity> {
    const { data, error } = await supabase.from('crm_activities').insert([activity]).select().single();
    if (error) throw error;
    return data;
  }
};
