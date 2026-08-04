require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    await client.query(`
      -- Users: Allow anonymous access for demo
      DROP POLICY IF EXISTS "Enable public access for demo" ON crm_users;
      CREATE POLICY "Enable public access for demo" ON crm_users FOR ALL USING (true) WITH CHECK (true);
      
      -- Roles: Allow anonymous access for demo
      DROP POLICY IF EXISTS "Enable public access for demo" ON crm_roles;
      CREATE POLICY "Enable public access for demo" ON crm_roles FOR ALL USING (true) WITH CHECK (true);
    `);
    console.log('Successfully created public RLS policies for crm_users and crm_roles!');
  } catch (e) {
    console.error('Error creating policies:', e);
  } finally {
    await client.end();
  }
}
run();
