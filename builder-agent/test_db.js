require('dotenv').config({path: '.env.local'});
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const queries = [
  { name: 'tenants', q: supabase.from('tenants').select('*').limit(1) },
  { name: 'packages', q: supabase.from('packages').select('*').limit(1) },
  { name: 'crm_users', q: supabase.from('crm_users').select('*, role_data:crm_roles(*)').limit(1) },
  { name: 'crm_roles', q: supabase.from('crm_roles').select('*').limit(1) },
  { name: 'crm_deals', q: supabase.from('crm_deals').select('*, contact:crm_contacts(*), stage:crm_stages(*), assignee:crm_users(*)').limit(1) },
  { name: 'crm_stages', q: supabase.from('crm_stages').select('*').limit(1) },
  { name: 'crm_activities', q: supabase.from('crm_activities').select('*, user:crm_users(*)').limit(1) },
  { name: 'crm_contacts', q: supabase.from('crm_contacts').select('*').limit(1) },
  { name: 'crm_custom_fields', q: supabase.from('crm_custom_fields').select('*').limit(1) },
  { name: 'crm_pipelines', q: supabase.from('crm_pipelines').select('*').limit(1) },
  { name: 'crm_products', q: supabase.from('crm_products').select('*').limit(1) },
  { name: 'crm_quotes', q: supabase.from('crm_quotes').select('*, items:crm_quote_items(*)').limit(1) },
  { name: 'crm_quote_items', q: supabase.from('crm_quote_items').select('*').limit(1) },
  { name: 'crm_kpis', q: supabase.from('crm_kpis').select('*, user:crm_users(*)').limit(1) },
  { name: 'booking_resources', q: supabase.from('booking_resources').select('*').limit(1) },
  { name: 'booking_services', q: supabase.from('booking_services').select('*').limit(1) },
  { name: 'booking_appointments', q: supabase.from('booking_appointments').select('*').limit(1) },
  { name: 'system_audit_logs', q: supabase.from('system_audit_logs').select('*, user:crm_users(*)').limit(1) },
  { name: 'knowledge_chunks', q: supabase.from('knowledge_chunks').select('*').limit(1) },
  { name: 'crm_courses', q: supabase.from('crm_courses').select('*').limit(1) },
  { name: 'crm_classes', q: supabase.from('crm_classes').select('*, course:crm_courses(*), teacher:crm_users(*)').limit(1) },
  { name: 'crm_enrollments', q: supabase.from('crm_enrollments').select('*, class:crm_classes(*), contact:crm_contacts(*)').limit(1) },
  { name: 'crm_materials', q: supabase.from('crm_materials').select('*').limit(1) }
];

(async () => {
  console.log('Testing Supabase Queries...');
  for (const { name, q } of queries) {
    try {
      const { error } = await q;
      if (error) {
        console.error(`[FAILED] ${name}:`, error.message);
      } else {
        console.log(`[OK] ${name}`);
      }
    } catch(err) {
      console.error(`[EXCEPTION] ${name}:`, err.message);
    }
  }
})();
