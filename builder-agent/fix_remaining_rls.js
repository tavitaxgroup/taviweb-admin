require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  const tablesToFix = [
    'tenants',
    'packages',
    'transactions',
    'audit_logs',
    'system_audit_logs',
    'knowledge_chunks'
  ];

  try {
    for (const table of tablesToFix) {
      console.log(`Fixing RLS for ${table}...`);
      try {
        await client.query(`
          CREATE POLICY "Enable all access for demo" ON ${table} FOR ALL USING (true) WITH CHECK (true);
        `);
        console.log(`  -> Added policy for ${table}`);
      } catch (e) {
        if (e.code === '42710') {
          console.log(`  -> Policy already exists for ${table}`);
        } else {
          console.error(`  -> Failed for ${table}:`, e.message);
        }
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
