require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const { rows: policies } = await client.query(`
      SELECT polname, polcmd, pg_get_expr(polqual, polrelid) AS qual
      FROM pg_policy 
      WHERE polrelid::regclass::text = 'tenants';
    `);
    console.log('Tenants Policies:', policies);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
