import { supabase } from '@/lib/supabase';
import { CRMUser, CRMPipeline, CRMStage, CRMContact, CRMDeal, CRMActivity, CRMCustomField } from '../types';
import { AuditService } from '@/lib/audit.service';

export const CRMService = {
  // Users
  async getUsers(tenantId: string): Promise<CRMUser[]> {
    const { data, error } = await supabase.from('crm_users').select('*, role_data:crm_roles(*)').eq('tenant_id', tenantId).order('name');
    if (error) throw error;
    return data || [];
  },
  async createUser(tenantId: string, user: Partial<CRMUser>): Promise<CRMUser> {
    const defaultPasswordHash = (user as any).password_hash || '$2a$10$defaultMockPasswordHash';
    const { data, error } = await supabase.from('crm_users').insert([{...user, password_hash: defaultPasswordHash, tenant_id: tenantId}]).select().single();
    if (error) throw error;
    
    await AuditService.logActivity({
      module: 'SETTINGS',
      action: 'CREATE',
      entityType: 'USER',
      entityId: data.id,
      description: `Tạo người dùng mới: ${user.name}`
    });
    
    return data;
  },
  async updateUser(tenantId: string, userId: string, data: Partial<CRMUser>): Promise<void> {
    const { error } = await supabase.from('crm_users').update(data).eq('id', userId).eq('tenant_id', tenantId);
    if (error) throw error;
  },
  async deleteUser(tenantId: string, userId: string): Promise<void> {
    const { error } = await supabase.from('crm_users').delete().eq('id', userId).eq('tenant_id', tenantId);
    if (error) throw error;
  },
  // Custom Fields
  async getCustomFields(tenantId: string, entityType: 'deal' | 'contact'): Promise<CRMCustomField[]> {
    const { data, error } = await supabase
      .from('crm_custom_fields')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('entity_type', entityType)
      .order('order_index');
    if (error) throw error;
    return data || [];
  },

  async upsertCustomField(tenantId: string, field: Partial<CRMCustomField>): Promise<CRMCustomField> {
    const { data, error } = await supabase.from('crm_custom_fields').upsert([{...field, tenant_id: tenantId}], { onConflict: 'id' }).select().single();
    if (error) throw error;
    
    await AuditService.logActivity({
      module: 'SETTINGS',
      action: field.id ? 'UPDATE' : 'CREATE',
      entityType: 'CUSTOM_FIELD',
      entityId: data.id,
      description: `${field.id ? 'Cập nhật' : 'Tạo'} trường dữ liệu tùy chỉnh: ${field.name}`
    });
    
    return data;
  },
  async deleteCustomField(tenantId: string, fieldId: string): Promise<void> {
    const { error } = await supabase.from('crm_custom_fields').delete().eq('id', fieldId).eq('tenant_id', tenantId);
    if (error) throw error;
    
    await AuditService.logActivity({
      module: 'SETTINGS',
      action: 'DELETE',
      entityType: 'CUSTOM_FIELD',
      entityId: fieldId,
      description: `Xóa trường dữ liệu tùy chỉnh ID: ${fieldId}`
    });
  },

  // Pipeline & Stages
  async getPipelines(tenantId: string): Promise<CRMPipeline[]> {
    const { data, error } = await supabase.from('crm_pipelines').select('*').eq('tenant_id', tenantId).order('created_at');
    if (error) throw error;
    return data || [];
  },
  async upsertPipeline(tenantId: string, pipeline: Partial<CRMPipeline>): Promise<CRMPipeline> {
    const { data, error } = await supabase.from('crm_pipelines').upsert([{...pipeline, tenant_id: tenantId}], { onConflict: 'id' }).select().single();
    if (error) throw error;
    
    await AuditService.logActivity({
      module: 'CRM',
      action: pipeline.id ? 'UPDATE' : 'CREATE',
      entityType: 'PIPELINE',
      entityId: data.id,
      description: `${pipeline.id ? 'Cập nhật' : 'Tạo'} pipeline: ${pipeline.name}`
    });
    
    return data;
  },
  async deletePipeline(tenantId: string, pipelineId: string): Promise<void> {
    const { error } = await supabase.from('crm_pipelines').delete().eq('id', pipelineId).eq('tenant_id', tenantId);
    if (error) throw error;
    
    await AuditService.logActivity({
      module: 'CRM',
      action: 'DELETE',
      entityType: 'PIPELINE',
      entityId: pipelineId,
      description: `Xóa pipeline ID: ${pipelineId}`
    });
  },
  
  async getStages(tenantId: string, pipelineId: string): Promise<CRMStage[]> {
    const { data, error } = await supabase.from('crm_stages').select('*').eq('pipeline_id', pipelineId).eq('tenant_id', tenantId).order('order');
    if (error) throw error;
    return data || [];
  },
  async upsertStages(tenantId: string, pipelineId: string, stages: Partial<CRMStage>[]): Promise<void> {
    // Để đồng bộ, xóa các stages cũ của pipeline này không nằm trong danh sách mới
    const currentStages = await this.getStages(tenantId, pipelineId);
    const newStageIds = stages.filter(s => !s.id?.startsWith('s_new_')).map(s => s.id);
    const stagesToDelete = currentStages.filter(s => !newStageIds.includes(s.id));
    
    for (const st of stagesToDelete) {
      await supabase.from('crm_stages').delete().eq('id', st.id);
    }

    // Upsert các stage mới (bỏ id ảo 's_new_' đi để db tự tạo uuid)
    const stagesToUpsert = stages.map(s => {
      const dbStage: any = {
        tenant_id: tenantId,
        pipeline_id: pipelineId,
        name: s.name,
        color: s.color, // NOTE: Needs crm_dynamic_setup.sql run first!
        order: s.order
      };
      if (s.id && !s.id.startsWith('s_new_')) {
        dbStage.id = s.id;
      }
      return dbStage;
    });

    if (stagesToUpsert.length > 0) {
      const { error } = await supabase.from('crm_stages').upsert(stagesToUpsert);
      if (error) throw error;
      
      await AuditService.logActivity({
        module: 'CRM',
        action: 'UPDATE',
        entityType: 'STAGE',
        entityId: pipelineId,
        description: `Cập nhật danh sách giai đoạn cho Pipeline ID: ${pipelineId}`
      });
    }
  },

  // Deals
  async getDeals(tenantId: string, pipelineId?: string, userId?: string, canViewAll?: boolean, stageIds?: string[]): Promise<CRMDeal[]> {
    let query = supabase
      .from('crm_deals')
      .select(`
        *,
        contact:crm_contacts(*),
        assignee:crm_users(*)
      `);

    query = query.eq('tenant_id', tenantId);

    if (!canViewAll && userId) {
      query = query.eq('assignee_id', userId);
    }

    if (stageIds && stageIds.length > 0) {
      query = query.in('stage_id', stageIds);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },
  async updateDeal(tenantId: string, dealId: string, data: Partial<CRMDeal>): Promise<void> {
    const { error } = await supabase.from('crm_deals').update(data).eq('id', dealId).eq('tenant_id', tenantId);
    if (error) throw error;
    
    await AuditService.logActivity({
      module: 'CRM',
      action: 'UPDATE',
      entityType: 'DEAL',
      entityId: dealId,
      description: `Cập nhật thông tin deal`
    });
  },

  async updateDealStage(tenantId: string, dealId: string, stageId: string): Promise<void> {
    const { error } = await supabase.from('crm_deals').update({ stage_id: stageId }).eq('id', dealId).eq('tenant_id', tenantId);
    if (error) throw error;
    
    await AuditService.logActivity({
      module: 'CRM',
      action: 'UPDATE_STAGE',
      entityType: 'DEAL',
      entityId: dealId,
      description: `Cập nhật giai đoạn mới (Stage ID: ${stageId}) cho Deal ID: ${dealId}`
    });
  },
  async updateContact(tenantId: string, contactId: string, data: Partial<CRMContact>): Promise<void> {
    const { error } = await supabase.from('crm_contacts').update(data).eq('id', contactId).eq('tenant_id', tenantId);
    if (error) throw error;
  },

  async createDealAndContact(tenantId: string, contact: Partial<CRMContact>, deal: Partial<CRMDeal>): Promise<CRMDeal> {
    // Tạo contact trước
    const { data: newContact, error: cErr } = await supabase.from('crm_contacts').insert([{...contact, tenant_id: tenantId}]).select().single();
    if (cErr) throw cErr;

    const { data: newDeal, error: dErr } = await supabase.from('crm_deals').insert([{
      ...deal,
      tenant_id: tenantId,
      contact_id: newContact.id
    }]).select().single();
    if (dErr) throw dErr;

    await AuditService.logActivity({
      module: 'CRM',
      action: 'CREATE',
      entityType: 'DEAL',
      entityId: newDeal.id,
      description: `Tạo cơ hội (Deal) mới: ${deal.title}`
    });

    return newDeal;
  },
  async deleteDeal(tenantId: string, dealId: string): Promise<void> {
    const { error } = await supabase.from('crm_deals').delete().eq('id', dealId).eq('tenant_id', tenantId);
    if (error) throw error;
    
    await AuditService.logActivity({
      module: 'CRM',
      action: 'DELETE',
      entityType: 'DEAL',
      entityId: dealId,
      description: `Xóa cơ hội (Deal ID: ${dealId})`
    });
  },

  // Activities
  async getActivities(tenantId: string, dealId: string): Promise<CRMActivity[]> {
    const { data, error } = await supabase
      .from('crm_activities')
      .select('*, user:crm_users(*)')
      .eq('deal_id', dealId)
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  async createActivity(tenantId: string, activity: Partial<CRMActivity>): Promise<CRMActivity> {
    const { data, error } = await supabase.from('crm_activities').insert([{...activity, tenant_id: tenantId}]).select().single();
    if (error) throw error;
    
    await AuditService.logActivity({
      module: 'CRM',
      action: 'ADD_NOTE',
      entityType: 'ACTIVITY',
      entityId: data.id,
      description: `Thêm ghi chú/hoạt động vào Deal ID: ${activity.deal_id}`
    });
    
    return data;
  },

  // Products & Quotes
  async getProducts(tenantId: string): Promise<any[]> {
    const { data, error } = await supabase.from('crm_products').select('*').eq('tenant_id', tenantId).order('price', { ascending: true });
    if (error) throw error;
    return data || [];
  },
  async createProduct(tenantId: string, product: any): Promise<any> {
    const { data, error } = await supabase.from('crm_products').insert([{...product, tenant_id: tenantId}]).select().single();
    if (error) throw error;
    return data;
  },
  async updateProduct(tenantId: string, productId: string, data: any): Promise<void> {
    const { error } = await supabase.from('crm_products').update(data).eq('id', productId).eq('tenant_id', tenantId);
    if (error) throw error;
  },
  async deleteProduct(tenantId: string, productId: string): Promise<void> {
    const { error } = await supabase.from('crm_products').delete().eq('id', productId).eq('tenant_id', tenantId);
    if (error) throw error;
  },
  async createQuote(tenantId: string, dealId: string, items: any[]): Promise<any> {
    const totalAmount = items.reduce((acc, item) => acc + item.total, 0);
    
    // 1. Create quote
    const { data: quote, error: qErr } = await supabase.from('crm_quotes').insert([{
      tenant_id: tenantId,
      deal_id: dealId,
      total_amount: totalAmount,
      status: 'draft'
    }]).select().single();
    
    if (qErr) throw qErr;

    // 2. Create quote items
    const quoteItems = items.map(i => ({
      tenant_id: tenantId,
      quote_id: quote.id,
      product_id: i.product_id,
      product_name: i.product_name,
      quantity: i.quantity,
      unit_price: i.unit_price,
      total: i.total
    }));

    const { error: qiErr } = await supabase.from('crm_quote_items').insert(quoteItems);
    if (qiErr) throw qiErr;

    // 3. Update deal value
    await supabase.from('crm_deals').update({ value: totalAmount }).eq('id', dealId).eq('tenant_id', tenantId);

    // 4. Log activity
    await this.createActivity(tenantId, {
      deal_id: dealId,
      type: 'note',
      content: `📝 Đã tạo bảng báo giá mới trị giá: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}`
    });

    return quote;
  },

  // KPI
  async getKpis(tenantId: string, month: number, year: number): Promise<any[]> {
    const { data, error } = await supabase.from('crm_kpis').select('*, user:crm_users(*)').eq('tenant_id', tenantId).eq('month', month).eq('year', year);
    if (error) throw error;
    return data || [];
  },
  async setKpi(tenantId: string, userId: string, targetRevenue: number, month: number, year: number): Promise<any> {
    // Upsert logic
    const { data, error } = await supabase.from('crm_kpis').upsert([{
      tenant_id: tenantId,
      user_id: userId,
      target_revenue: targetRevenue,
      month,
      year
    }], { onConflict: 'user_id,month,year' }).select();
    if (error) throw error;
    return data;
  },

  // Roles & Users
  async getRoles(tenantId: string): Promise<any[]> {
    const { data, error } = await supabase.from('crm_roles').select('*').eq('tenant_id', tenantId).order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  },
  async createRole(tenantId: string, role: any): Promise<any> {
    const { data, error } = await supabase.from('crm_roles').insert([{...role, tenant_id: tenantId}]).select().single();
    if (error) throw error;
    return data;
  },
  async updateRole(tenantId: string, id: string, role: any): Promise<any> {
    const { data, error } = await supabase.from('crm_roles').update(role).eq('id', id).eq('tenant_id', tenantId).select().single();
    if (error) throw error;
    return data;
  },
  async deleteRole(tenantId: string, id: string): Promise<void> {
    const { error } = await supabase.from('crm_roles').delete().eq('id', id).eq('tenant_id', tenantId);
    if (error) throw error;
  }
};
