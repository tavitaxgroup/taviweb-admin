require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    // Delete the 200 tenants that were created just now (they have slug starting with 'demo-')
    const res = await client.query(`DELETE FROM tenants WHERE slug LIKE 'demo-%'`);
    console.log(`Deleted ${res.rowCount} bad demo tenants.`);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
