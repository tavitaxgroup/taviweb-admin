require('dotenv').config({path: '.env.local'});
const { Client } = require('pg');

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  try {
    await client.connect();
    
    // Fix orphaned audit logs (invalid user_id)
    await client.query(`
      UPDATE system_audit_logs
      SET user_id = NULL
      WHERE user_id IS NOT NULL AND user_id NOT IN (SELECT id FROM crm_users);
    `);
    
    // Add foreign key for user_id in system_audit_logs
    await client.query(`
      ALTER TABLE system_audit_logs 
      DROP CONSTRAINT IF EXISTS system_audit_logs_user_id_fkey;
      
      ALTER TABLE system_audit_logs 
      ADD CONSTRAINT system_audit_logs_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES crm_users(id) ON DELETE SET NULL;
    `);
    console.log('Added foreign key for user_id in system_audit_logs');
    
    // Force reload schema
    await client.query(`NOTIFY pgrst, 'reload schema'`);
    console.log('Reloaded schema cache');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
})();
