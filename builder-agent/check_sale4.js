const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres.llposvgrqjsrqktahrtw:SwZczgd%21q%233%2Fn.5@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres'
});
async function run() {
  await client.connect();
  const res = await client.query('SELECT id, email, password_hash, tenant_id FROM crm_users WHERE email = $1', ['sale4@taviweb.com']);
  console.log(res.rows);
  await client.end();
}
run();
