require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    await client.query(`
      -- Add public access for anon role to insert and read system_audit_logs for demo
      DROP POLICY IF EXISTS "Enable public insert for demo" ON system_audit_logs;
      CREATE POLICY "Enable public insert for demo" ON system_audit_logs FOR INSERT WITH CHECK (true);
      
      DROP POLICY IF EXISTS "Enable public read for demo" ON system_audit_logs;
      CREATE POLICY "Enable public read for demo" ON system_audit_logs FOR SELECT USING (true);
    `);
    console.log('Successfully added public policies to system_audit_logs.');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
