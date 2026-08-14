const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.llposvgrqjsrqktahrtw:SwZczgd%21q%233%2Fn.5@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres' });

async function run() {
  await client.connect();
  
  // Get sale5 ID
  const res = await client.query('SELECT id FROM crm_users WHERE email = $1', ['sale5@taviweb.com']);
  const sale5Id = res.rows[0].id;
  
  // Find leads assigned to sale 5
  const leadsRes = await client.query('SELECT id, industry FROM leads WHERE assigned_to = $1', [sale5Id]);
  const leads = leadsRes.rows;
  
  for (const lead of leads) {
    if (lead.industry) {
      await client.query('UPDATE tenants SET template_key = $1 WHERE id = $2', [lead.industry, lead.id]);
    }
  }
  
  console.log(`Updated template_key for ${leads.length} tenants.`);
  await client.end();
}

run().catch(console.error);
