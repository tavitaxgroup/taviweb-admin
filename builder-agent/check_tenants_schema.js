require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const { rows } = await client.query(`SELECT column_name, data_type, column_default, is_nullable FROM information_schema.columns WHERE table_name = 'tenants'`);
    console.log(rows);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
