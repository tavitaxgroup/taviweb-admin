import { supabase } from './supabase';

export interface AuditLogData {
  userId?: string;
  module: 'CRM' | 'LEADS' | 'BOOKING' | 'SETTINGS' | 'AUTH' | 'SYSTEM';
  action: string; // e.g., 'CREATE', 'UPDATE', 'DELETE', 'PUSH', 'LOGIN'
  entityType?: string; // e.g., 'DEAL', 'LEAD', 'PIPELINE', 'USER'
  entityId?: string;
  description: string;
  details?: any;
}

export const AuditService = {
  /**
   * Log an activity to the system_audit_logs table.
   */
  async logActivity(data: AuditLogData): Promise<void> {
    try {
      let userId = data.userId;
      
      // If userId is not provided, try to get the current authenticated user's ID
      if (!userId) {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session?.user) {
           // We might need to map from auth.users to crm_users if needed, 
           // or we assume the CRM context can provide it.
           // For now, if we don't have it, we leave it null or try to find it.
        }
      }

      await supabase.from('system_audit_logs').insert([{
        user_id: userId || null,
        module: data.module,
        action: data.action,
        entity_type: data.entityType || null,
        entity_id: data.entityId || null,
        description: data.description,
        details: data.details || null
      }]);
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  },

  /**
   * Fetch recent audit logs with pagination and optional filters.
   */
  async getAuditLogs(options?: {
    module?: string;
    userId?: string;
    limit?: number;
    offset?: number;
  }): Promise<any[]> {
    const { module, userId, limit = 100, offset = 0 } = options || {};
    
    let query = supabase
      .from('system_audit_logs')
      .select('*, user:crm_users(name, role)')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (module) {
      query = query.eq('module', module);
    }
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Failed to fetch audit logs:', error);
      return [];
    }
    
    return data || [];
  }
};
