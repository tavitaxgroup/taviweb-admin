const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.llposvgrqjsrqktahrtw:SwZczgd%21q%233%2Fn.5@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres' });
const crypto = require('crypto');

function extractSlug(demoUrl) {
  if (!demoUrl) return null;
  // If it's a full URL
  if (demoUrl.startsWith('http')) {
    return demoUrl.split('/').pop();
  }
  return demoUrl;
}

async function run() {
  await client.connect();
  
  // 1. Fetch all leads that have a demo_url
  const res = await client.query('SELECT id, name, industry, demo_url FROM leads WHERE demo_url IS NOT NULL');
  const leads = res.rows;
  let fixedCount = 0;
  
  for (const lead of leads) {
    const slug = extractSlug(lead.demo_url);
    if (!slug) continue;
    
    // Fix demo_url in leads table to just be the slug
    if (lead.demo_url.startsWith('http')) {
      await client.query('UPDATE leads SET demo_url = $1 WHERE id = $2', [slug, lead.id]);
    }
    
    // 2. Check if a tenant with this slug exists
    const tRes = await client.query('SELECT id, template_key FROM tenants WHERE slug = $1', [slug]);
    
    if (tRes.rows.length > 0) {
      // Tenant exists, just ensure template_key is correct
      if (tRes.rows[0].template_key !== lead.industry) {
        await client.query('UPDATE tenants SET template_key = $1 WHERE slug = $2', [lead.industry, slug]);
        fixedCount++;
      }
    } else {
      // 3. If it doesn't exist by slug, maybe there's a junk tenant created by the previous agent?
      // Delete the junk tenant for this lead.id if it exists to avoid primary key conflict
      await client.query('DELETE FROM crm_users WHERE tenant_id = $1', [lead.id]);
      await client.query('DELETE FROM tenants WHERE id = $1', [lead.id]);
      
      // 4. Create the correct tenant using the slug
      await client.query(`
        INSERT INTO tenants (id, name, slug, template_key) VALUES ($1, $2, $3, $4)
      `, [lead.id, lead.name || 'Demo Tenant', slug, lead.industry]);
      fixedCount++;
    }
  }
  
  console.log(`Finished fixing. Updated/Created ${fixedCount} tenants.`);
  await client.end();
}

run().catch(console.error);
