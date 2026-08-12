require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const { rows: tenants } = await client.query('SELECT id, slug, name FROM tenants');
    
    console.log(`Found ${tenants.length} tenants. Checking missing admins...`);
    
    const hash = await bcrypt.hash('123456', 10);
    let inserted = 0;

    for (const t of tenants) {
      const { rows: admins } = await client.query('SELECT id FROM crm_users WHERE tenant_id = $1 AND role = $2', [t.id, 'admin']);
      
      if (admins.length === 0) {
        const email = `admin@${t.slug}.com`;
        await client.query(`
          INSERT INTO crm_users (name, email, role, password_hash, tenant_id)
          VALUES ($1, $2, $3, $4, $5)
        `, [`Admin của ${t.name}`, email, 'admin', hash, t.id]);
        inserted++;
      }
    }
    
    console.log(`Done! Created ${inserted} missing admin accounts.`);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await client.end();
  }
}

run();
