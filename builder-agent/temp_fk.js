require('dotenv').config({path: '.env.local'});
const { Client } = require('pg');

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  try {
    await client.connect();
    
    // Fix orphaned deals
    await client.query(`
      UPDATE crm_deals
      SET assignee_id = NULL
      WHERE assignee_id NOT IN (SELECT id FROM crm_users);
    `);
    
    // Add foreign key for assignee_id
    await client.query(`
      ALTER TABLE crm_deals 
      DROP CONSTRAINT IF EXISTS crm_deals_assignee_id_fkey;
      
      ALTER TABLE crm_deals 
      ADD CONSTRAINT crm_deals_assignee_id_fkey 
      FOREIGN KEY (assignee_id) REFERENCES crm_users(id) ON DELETE SET NULL;
    `);
    console.log('Added foreign key for assignee_id');

    // Clean up orphaned contact deals just in case
    await client.query(`
      DELETE FROM crm_deals
      WHERE contact_id NOT IN (SELECT id FROM crm_contacts) AND contact_id IS NOT NULL;
    `);

    // Add foreign key for contact_id
    await client.query(`
      ALTER TABLE crm_deals 
      DROP CONSTRAINT IF EXISTS crm_deals_contact_id_fkey;
      
      ALTER TABLE crm_deals 
      ADD CONSTRAINT crm_deals_contact_id_fkey 
      FOREIGN KEY (contact_id) REFERENCES crm_contacts(id) ON DELETE CASCADE;
    `);
    console.log('Added foreign key for contact_id');
    
    // Force reload schema
    await client.query(`NOTIFY pgrst, 'reload schema'`);
    console.log('Reloaded schema cache');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
})();
