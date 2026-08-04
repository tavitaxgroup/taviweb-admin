require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    await client.query(`
      -- Tenants: Allow anonymous select for demo
      DROP POLICY IF EXISTS "Enable public select for demo" ON tenants;
      CREATE POLICY "Enable public select for demo" ON tenants FOR SELECT USING (true);
    `);
    console.log('Successfully created SELECT policy for tenants!');
  } catch (e) {
    console.error('Error creating policies:', e);
  } finally {
    await client.end();
  }
}
run();
