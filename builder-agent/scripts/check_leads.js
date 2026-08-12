require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    // Check columns
    const cols = await client.query(`
      SELECT table_name, column_name 
      FROM information_schema.columns 
      WHERE table_name IN ('leads', 'tenants')
      ORDER BY table_name, column_name
    `);
    console.log("Columns:", cols.rows.reduce((acc, row) => {
      acc[row.table_name] = acc[row.table_name] || [];
      acc[row.table_name].push(row.column_name);
      return acc;
    }, {}));

    const matches = await client.query(`
      SELECT l.id as lead_id, l.name as lead_name,
             t.id as tenant_id, t.name as tenant_name, t.slug as tenant_slug, t.custom_domain
      FROM leads l
      JOIN tenants t ON (l.name = t.name)
    `);
    console.log("Matches by Exact Name:", matches.rows);
    
    // Check some sample tenants
    const sampleTenants = await client.query(`SELECT name, contact_info FROM tenants LIMIT 5`);
    console.log("Sample Tenants:", sampleTenants.rows);
    
    // Check some sample leads
    const sampleLeads = await client.query(`SELECT name, formatted_phone_number, facebook_email FROM leads LIMIT 5`);
    console.log("Sample Leads:", sampleLeads.rows);
    
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
