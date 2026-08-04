require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const { rows } = await client.query(`
      SELECT relrowsecurity 
      FROM pg_class 
      WHERE relname = 'crm_audit_logs';
    `);
    console.log('crm_audit_logs RLS enabled:', rows);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
