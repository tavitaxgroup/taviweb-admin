require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    // Update demo_url based on tenants table
    const result = await client.query(`
      UPDATE leads l
      SET demo_url = COALESCE(
        'https://' || t.custom_domain, 
        'http://localhost:3000/' || t.slug
      )
      FROM tenants t
      WHERE l.name = t.name
    `);
    
    console.log(`Updated ${result.rowCount} leads with demo_url!`);
    
  } finally {
    await client.end();
  }
}
run();
