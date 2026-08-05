import { supabase } from '@/lib/supabase';

export interface BookingResource {
  id: string;
  tenant_id: string;
  name: string;
  type: string;
  role_or_capacity: string;
  status: string;
  created_at: string;
}

export interface BookingServiceItem {
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  created_at: string;
}

export interface BookingAppointment {
  id: string;
  tenant_id: string;
  resource_id: string;
  customer_name: string;
  customer_phone?: string;
  service_id?: string;
  service_name?: string;
  start_time: string;
  end_time: string;
  status: string;
  notes?: string;
  created_at: string;
}

export const BookingService = {
  async getResources(tenantId: string): Promise<BookingResource[]> {
    const { data, error } = await supabase.from('booking_resources').select('*').eq('tenant_id', tenantId).order('created_at');
    if (error) throw error;
    return data || [];
  },

  async getServices(tenantId: string): Promise<BookingServiceItem[]> {
    const { data, error } = await supabase.from('booking_services').select('*').eq('tenant_id', tenantId).order('created_at');
    if (error) throw error;
    return data || [];
  },

  async getAppointments(tenantId: string, dateStart: string, dateEnd: string): Promise<BookingAppointment[]> {
    const { data, error } = await supabase
      .from('booking_appointments')
      .select('*')
      .eq('tenant_id', tenantId)
      .gte('start_time', dateStart)
      .lt('start_time', dateEnd)
      .order('start_time');
    if (error) throw error;
    return data || [];
  },

  async createResource(tenantId: string, resource: Partial<BookingResource>): Promise<BookingResource> {
    const { data, error } = await supabase.from('booking_resources').insert([{ ...resource, tenant_id: tenantId }]).select().single();
    if (error) throw error;
    return data;
  },

  async createService(tenantId: string, service: Partial<BookingServiceItem>): Promise<BookingServiceItem> {
    const { data, error } = await supabase.from('booking_services').insert([{ ...service, tenant_id: tenantId }]).select().single();
    if (error) throw error;
    return data;
  },

  async updateResource(tenantId: string, id: string, resource: Partial<BookingResource>): Promise<void> {
    const { error } = await supabase.from('booking_resources').update(resource).eq('id', id).eq('tenant_id', tenantId);
    if (error) throw error;
  },

  async deleteResource(tenantId: string, id: string): Promise<void> {
    const { error } = await supabase.from('booking_resources').delete().eq('id', id).eq('tenant_id', tenantId);
    if (error) throw error;
  },

  async updateService(tenantId: string, id: string, service: Partial<BookingServiceItem>): Promise<void> {
    const { error } = await supabase.from('booking_services').update(service).eq('id', id).eq('tenant_id', tenantId);
    if (error) throw error;
  },

  async deleteService(tenantId: string, id: string): Promise<void> {
    const { error } = await supabase.from('booking_services').delete().eq('id', id).eq('tenant_id', tenantId);
    if (error) throw error;
  },

  async createAppointment(tenantId: string, appointment: Partial<BookingAppointment>): Promise<BookingAppointment> {
    const { data, error } = await supabase.from('booking_appointments').insert([{ ...appointment, tenant_id: tenantId }]).select().single();
    if (error) throw error;
    return data;
  },

  async updateAppointmentStatus(tenantId: string, id: string, status: string): Promise<void> {
    const { error } = await supabase.from('booking_appointments').update({ status }).eq('id', id).eq('tenant_id', tenantId);
    if (error) throw error;
  },

  async getSettings(tenantId: string): Promise<{ opening_time: string, closing_time: string }> {
    const { data, error } = await supabase.from('tenants').select('theme_config').eq('id', tenantId).single();
    if (error) throw error;
    const config = data?.theme_config || {};
    return {
      opening_time: config.booking_opening_time || '08:00',
      closing_time: config.booking_closing_time || '21:00'
    };
  },

  async updateSettings(tenantId: string, settings: { opening_time: string, closing_time: string }): Promise<void> {
    const { data: tenant, error: fetchError } = await supabase.from('tenants').select('theme_config').eq('id', tenantId).single();
    if (fetchError) throw fetchError;
    
    const newConfig = {
      ...(tenant?.theme_config || {}),
      booking_opening_time: settings.opening_time,
      booking_closing_time: settings.closing_time
    };

    const { error: updateError } = await supabase.from('tenants').update({ theme_config: newConfig }).eq('id', tenantId);
    if (updateError) throw updateError;
  },

  async getTemplateKey(tenantId: string): Promise<string> {
    const { data, error } = await supabase.from('tenants').select('template_key').eq('id', tenantId).single();
    if (error || !data) return 'salon_toc'; // default fallback
    return data.template_key || 'salon_toc';
  }
};
