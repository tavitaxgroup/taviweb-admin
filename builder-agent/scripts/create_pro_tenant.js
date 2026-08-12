require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    // Create Pro Tenant
    const tenantId = '11111111-1111-1111-1111-111111111111';
    await client.query(`
      INSERT INTO public.tenants (id, name, slug, active_modules)
      VALUES ($1, 'Pro Demo Business', 'pro-demo', '["crm", "booking", "leads", "automation", "reports"]')
      ON CONFLICT (slug) DO UPDATE
      SET active_modules = '["crm", "booking", "leads", "automation", "reports"]';
    `, [tenantId]);

    // Create Admin User for this tenant
    const hash = await bcrypt.hash('pro123456', 10);
    
    const { rowCount } = await client.query('SELECT 1 FROM public.crm_users WHERE email = $1', ['pro@test.com']);
    
    if (rowCount > 0) {
       await client.query('UPDATE public.crm_users SET password_hash = $1, tenant_id = $2 WHERE email = $3', [hash, tenantId, 'pro@test.com']);
    } else {
       await client.query(`
         INSERT INTO public.crm_users (tenant_id, name, email, role, password_hash)
         VALUES ($1, 'Admin Pro', 'pro@test.com', 'admin', $2)
       `, [tenantId, hash]);
    }

    console.log('Successfully created Pro account!');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
