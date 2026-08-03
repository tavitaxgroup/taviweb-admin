require('dotenv').config({path: '.env.local'});
const { Client } = require('pg');

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  try {
    await client.connect();
    
    // Fix orphaned KPIs (invalid user_id)
    await client.query(`
      DELETE FROM crm_kpis
      WHERE user_id NOT IN (SELECT id FROM crm_users);
    `);
    
    // Add foreign key for user_id in crm_kpis
    await client.query(`
      ALTER TABLE crm_kpis 
      DROP CONSTRAINT IF EXISTS crm_kpis_user_id_fkey;
      
      ALTER TABLE crm_kpis 
      ADD CONSTRAINT crm_kpis_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES crm_users(id) ON DELETE CASCADE;
    `);
    console.log('Added foreign key for user_id in crm_kpis');

    // Fix orphaned Activities
    await client.query(`
      DELETE FROM crm_activities
      WHERE user_id IS NOT NULL AND user_id NOT IN (SELECT id FROM crm_users);
      
      DELETE FROM crm_activities
      WHERE deal_id IS NOT NULL AND deal_id NOT IN (SELECT id FROM crm_deals);
    `);

    // Add foreign key for user_id in crm_activities
    await client.query(`
      ALTER TABLE crm_activities 
      DROP CONSTRAINT IF EXISTS crm_activities_user_id_fkey;
      
      ALTER TABLE crm_activities 
      ADD CONSTRAINT crm_activities_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES crm_users(id) ON DELETE SET NULL;
      
      ALTER TABLE crm_activities 
      DROP CONSTRAINT IF EXISTS crm_activities_deal_id_fkey;
      
      ALTER TABLE crm_activities 
      ADD CONSTRAINT crm_activities_deal_id_fkey 
      FOREIGN KEY (deal_id) REFERENCES crm_deals(id) ON DELETE CASCADE;
    `);
    console.log('Added foreign keys to crm_activities');
    
    // Force reload schema
    await client.query(`NOTIFY pgrst, 'reload schema'`);
    console.log('Reloaded schema cache');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
})();
