const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.llposvgrqjsrqktahrtw:SwZczgd%21q%233%2Fn.5@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres' });

async function run() {
  await client.connect();
  const res = await client.query(`
    SELECT l.name, l.industry, l.demo_url, t.template_key, t.id as tenant_id, l.id as lead_id
    FROM leads l
    JOIN crm_users u ON l.assigned_to = u.id
    LEFT JOIN tenants t ON l.demo_url = t.slug
    WHERE u.email = 'sale5@taviweb.com'
  `);
  console.log(res.rows);
  await client.end();
}
run().catch(console.error);
