require('dotenv').config({path: '.env.local'});
const { Client } = require('pg');

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  try {
    await client.connect();
    
    // Add theme_config column to tenants if it doesn't exist
    await client.query(`
      ALTER TABLE tenants 
      ADD COLUMN IF NOT EXISTS theme_config JSONB DEFAULT '{}'::jsonb;
    `);
    
    console.log('Added theme_config to tenants');
    
    // Force reload schema
    await client.query(`NOTIFY pgrst, 'reload schema'`);
    console.log('Reloaded schema cache');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
})();
