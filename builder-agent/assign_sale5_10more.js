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
  
  // 1. Get Sale 5 ID
  const res = await client.query('SELECT id, password_hash FROM crm_users WHERE email = $1', ['sale5@taviweb.com']);
  if (res.rows.length === 0) {
    console.log("Sale 5 not found!");
    await client.end();
    return;
  }
  const sale5Id = res.rows[0].id;
  const pass = res.rows[0].password_hash;
  
  // 2. Find 10 more high quality leads
  const leadsRes = await client.query(`
    SELECT * FROM leads 
    WHERE assigned_to IS NULL 
      AND formatted_phone_number IS NOT NULL 
      AND formatted_phone_number != '' 
      AND (website IS NULL OR website = '')
    ORDER BY rating DESC NULLS LAST 
    LIMIT 10
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
    const tRes = await client.query('SELECT id FROM tenants WHERE id = $1', [lead.id]);
    const slug = await slugify(lead.name);
    
    if (tRes.rows.length === 0) {
      // Insert with template_key mapped from industry
      await client.query(`
        INSERT INTO tenants (id, name, slug, template_key) VALUES ($1, $2, $3, $4)
      `, [lead.id, lead.name || 'Demo Tenant', slug, lead.industry || null]);
      
      const adminEmail = `admin@${slug}.com`;
      await client.query(`
        INSERT INTO crm_users (name, email, role, password_hash, tenant_id)
        VALUES ($1, $2, $3, $4, $5)
      `, ['Admin của ' + (lead.name || 'Demo'), adminEmail, 'admin', pass, lead.id]);
      
      await client.query(`UPDATE leads SET demo_url = $1 WHERE id = $2`, [slug, lead.id]);
    } else {
      // Update template_key if already exists just in case
      await client.query('UPDATE tenants SET template_key = $1 WHERE id = $2', [lead.industry, lead.id]);
    }
  }

  console.log('Done assigning and provisioning 10 more leads!');
  await client.end();
}

run().catch(console.error);
