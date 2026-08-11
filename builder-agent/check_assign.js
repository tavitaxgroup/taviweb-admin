const { Client } = require('pg');
async function check() {
  const client = new Client({
    connectionString: 'postgresql://postgres.llposvgrqjsrqktahrtw:SwZczgd%21q%233%2Fn.5@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres'
  });
  await client.connect();
  const res = await client.query('SELECT assigned_to, COUNT(*) FROM leads GROUP BY assigned_to');
  console.log('Leads assignment counts:', res.rows);
  const users = await client.query('SELECT id, email, name FROM crm_users WHERE role = $1', ['sale']);
  console.log('Sales users:', users.rows);
  await client.end();
}
check();
