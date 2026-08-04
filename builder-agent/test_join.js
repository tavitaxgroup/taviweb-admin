require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
async function run() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  const { data: user, error } = await supabase
    .from('crm_users')
    .select('id, name, tenant:tenants(slug, template_key)')
    .limit(1)
    .single();
    
  console.log(user);
}
run();
