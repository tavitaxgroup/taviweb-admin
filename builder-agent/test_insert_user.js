require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function run() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // mock tenant id
  const tenant_id = 'e942f9b8-xxxx-xxxx-xxxx-xxxxxxxxxxxx'; // wait, need a real tenant_id for FK
  
  try {
    const { data: tenantData } = await supabase.from('tenants').select('id').limit(1).single();
    if (!tenantData) throw new Error('No tenant found');
    const t_id = tenantData.id;
    
    const { data: roleData } = await supabase.from('crm_roles').select('id').limit(1).single();
    const r_id = roleData ? roleData.id : null;
    
    console.log('Inserting with tenant:', t_id, 'role:', r_id);
    
    const { data, error } = await supabase.from('crm_users').insert([{
      name: 'Test user',
      email: 'test@example.com',
      role_id: r_id,
      tenant_id: t_id
    }]).select().single();
    
    if (error) {
      console.error('Insert error:', error);
    } else {
      console.log('Insert success:', data);
    }
  } catch (e) {
    console.error('Exception:', e);
  }
}
run();
