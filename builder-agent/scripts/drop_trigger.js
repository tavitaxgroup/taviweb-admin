require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    await client.query('DROP TRIGGER IF EXISTS trg_check_crm_user_limit ON crm_users;');
    await client.query('DROP FUNCTION IF EXISTS check_crm_user_limit();');
    console.log('Trigger dropped successfully.');
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await client.end();
  }
}

run();
