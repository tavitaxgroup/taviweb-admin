require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function fixRLS() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    console.log('--- STARTING RLS SECURITY FIX ---');

    // Mảng các bảng cần siết chặt RLS
    const tables = [
      'booking_appointments',
      'booking_resources',
      'booking_services',
      'crm_activities',
      'crm_contacts',
      'crm_deals',
      'crm_kpis',
      'crm_pipelines',
      'crm_products',
      'crm_quote_items',
      'crm_quotes',
      'crm_stages',
      'knowledge_chunks'
    ];

    for (const table of tables) {
      console.log(`Processing table: ${table}...`);
      
      // Bật RLS
      await client.query(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`);

      // Xóa policy "Enable all access for demo" và "Enable all access"
      try {
        await client.query(`DROP POLICY IF EXISTS "Enable all access for demo" ON ${table};`);
        await client.query(`DROP POLICY IF EXISTS "Enable all access" ON ${table};`);
      } catch (e) {
        // ignore
      }

      // Tạo Policy SELECT
      try {
        await client.query(`DROP POLICY IF EXISTS "Tenant can view own data" ON ${table};`);
        await client.query(`
          CREATE POLICY "Tenant can view own data" ON ${table}
          FOR SELECT
          USING (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);
        `);
      } catch (e) { console.error(e.message); }

      // Tạo Policy INSERT
      try {
        await client.query(`DROP POLICY IF EXISTS "Tenant can insert own data" ON ${table};`);
        await client.query(`
          CREATE POLICY "Tenant can insert own data" ON ${table}
          FOR INSERT
          WITH CHECK (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);
        `);
      } catch (e) { console.error(e.message); }

      // Tạo Policy UPDATE
      try {
        await client.query(`DROP POLICY IF EXISTS "Tenant can update own data" ON ${table};`);
        await client.query(`
          CREATE POLICY "Tenant can update own data" ON ${table}
          FOR UPDATE
          USING (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid)
          WITH CHECK (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);
        `);
      } catch (e) { console.error(e.message); }

      // Tạo Policy DELETE
      try {
        await client.query(`DROP POLICY IF EXISTS "Tenant can delete own data" ON ${table};`);
        await client.query(`
          CREATE POLICY "Tenant can delete own data" ON ${table}
          FOR DELETE
          USING (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);
        `);
      } catch (e) { console.error(e.message); }
      
      console.log(`  -> Applied strict tenant isolation to ${table}`);
    }

    // Xử lý riêng bảng crm_users (vì có policy đặc biệt)
    console.log(`Processing table: crm_users...`);
    await client.query(`ALTER TABLE crm_users ENABLE ROW LEVEL SECURITY;`);
    await client.query(`DROP POLICY IF EXISTS "Enable public access for demo" ON crm_users;`);
    await client.query(`DROP POLICY IF EXISTS "Enable all access for demo" ON crm_users;`);
    // (Giữ lại các policy "Tenant admin can update/view users" nếu có)
    console.log(`  -> Applied strict tenant isolation to crm_users`);
    
    // Xử lý riêng bảng tenants
    console.log(`Processing table: tenants...`);
    await client.query(`ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;`);
    await client.query(`DROP POLICY IF EXISTS "Enable public select for demo" ON tenants;`);
    await client.query(`DROP POLICY IF EXISTS "Enable public update for demo" ON tenants;`);
    await client.query(`DROP POLICY IF EXISTS "Enable all access for demo" ON tenants;`);
    console.log(`  -> Applied strict tenant isolation to tenants`);

    console.log('--- RLS SECURITY FIX COMPLETE ---');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
fixRLS();
