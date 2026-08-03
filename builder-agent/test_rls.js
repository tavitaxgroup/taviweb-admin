require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const res = await client.query(`SELECT polname, polcmd FROM pg_policy WHERE polrelid = 'tenants'::regclass;`);
  console.log(res.rows);
  await client.end();
}
run();
