require('dotenv').config({path: '.env.local'});
const { Client } = require('pg');

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  try {
    await client.connect();
    
    // Add role_id column to crm_users if it doesn't exist
    await client.query(`
      ALTER TABLE crm_users 
      ADD COLUMN IF NOT EXISTS role_id UUID;
    `);

    // Add foreign key constraint for role_id to crm_roles
    await client.query(`
      ALTER TABLE crm_users 
      DROP CONSTRAINT IF EXISTS crm_users_role_id_fkey;
      
      ALTER TABLE crm_users 
      ADD CONSTRAINT crm_users_role_id_fkey 
      FOREIGN KEY (role_id) REFERENCES crm_roles(id) ON DELETE SET NULL;
    `);
    console.log('Added role_id and foreign key to crm_users');
    
    // Check if PostgREST schema cache needs a reload
    await client.query(`NOTIFY pgrst, 'reload schema'`);
    console.log('Reloaded schema cache');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
})();
