const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
  connectionString: 'postgresql://postgres.llposvgrqjsrqktahrtw:SwZczgd%21q%233%2Fn.5@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres'
});

async function run() {
  await client.connect();
  const hash = await bcrypt.hash('123456', 10);
  const res = await client.query('UPDATE crm_users SET password_hash = $1 WHERE email = $2', [hash, 'sale4@taviweb.com']);
  console.log('Rows updated:', res.rowCount);
  await client.end();
}

run();
