const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const client = new Client({ connectionString: 'postgresql://postgres.llposvgrqjsrqktahrtw:SwZczgd%21q%233%2Fn.5@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres' });

async function slugify(text) {
  if (!text) return crypto.randomUUID().slice(0, 8);
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + crypto.randomUUID().slice(0, 4);
}

async function run() {
  await client.connect();
  
  // 1. Create Sale 5
  const superAdminTenantId = '6064025b-7fe4-4840-a27f-2d5da65e15fa';
  const pass = await bcrypt.hash('123456', 10);
  const email = 'sale5@taviweb.com';
  
  let sale5Id;
  const res = await client.query('SELECT id FROM crm_users WHERE email = $1', [email]);
  if (res.rows.length === 0) {
    const insert = await client.query(`
      INSERT INTO crm_users (name, email, role, password_hash, tenant_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING id;
    `, ['Sale 5', email, 'sale', pass, superAdminTenantId]);
    sale5Id = insert.rows[0].id;
  } else {
    sale5Id = res.rows[0].id;
    // ensure password is correct
    await client.query('UPDATE crm_users SET password_hash = $1 WHERE id = $2', [pass, sale5Id]);
  }
  
  console.log('Sale 5 ID:', sale5Id);

  // 2. Find 20 high quality leads (has phone, ordered by rating)
  const leadsRes = await client.query(`
    SELECT * FROM leads 
    WHERE assigned_to IS NULL 
      AND formatted_phone_number IS NOT NULL 
      AND formatted_phone_number != '' 
      AND (website IS NULL OR website = '')
    ORDER BY rating DESC NULLS LAST 
    LIMIT 20
  `);
  
  const leads = leadsRes.rows;
  console.log(`Found ${leads.length} high quality leads.`);
  
  if (leads.length === 0) {
    console.log("No leads found.");
    await client.end();
    return;
  }

  // 3. Assign and provision tenants
  for (const lead of leads) {
    console.log(`Processing lead: ${lead.name}`);
    // Assign to sale5
    await client.query(`UPDATE leads SET assigned_to = $1, sales_status = 'chưa sale' WHERE id = $2`, [sale5Id, lead.id]);
    
    // Auto-provision tenant
    // Check if tenant exists
    const tRes = await client.query('SELECT id FROM tenants WHERE id = $1', [lead.id]);
    if (tRes.rows.length === 0) {
      const slug = await slugify(lead.name);
      await client.query(`
        INSERT INTO tenants (id, name, slug) VALUES ($1, $2, $3)
      `, [lead.id, lead.name || 'Demo Tenant', slug]);
      
      const adminEmail = `admin@${slug}.com`;
      await client.query(`
        INSERT INTO crm_users (name, email, role, password_hash, tenant_id)
        VALUES ($1, $2, $3, $4, $5)
      `, ['Admin của ' + (lead.name || 'Demo'), adminEmail, 'admin', pass, lead.id]);
      
      await client.query(`UPDATE leads SET demo_url = $1 WHERE id = $2`, [slug, lead.id]);
    }
  }

  console.log('Done assigning and provisioning!');
  await client.end();
}

run().catch(console.error);
