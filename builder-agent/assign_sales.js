const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const { Client } = require('pg');

async function setupDb() {
  const client = new Client({
    connectionString: 'postgresql://postgres.llposvgrqjsrqktahrtw:SwZczgd%21q%233%2Fn.5@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres'
  });
  
  try {
    await client.connect();
    console.log('Connected to PG');
    
    // Add assigned_to to leads
    await client.query(`
      ALTER TABLE leads 
      ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES crm_users(id) ON DELETE SET NULL;
    `);
    console.log('Added assigned_to to leads table');
    
    // Create 3 sale accounts
    const superAdminTenantId = '6064025b-7fe4-4840-a27f-2d5da65e15fa';
    const pass = await bcrypt.hash('sale123', 10);
    
    const sales = [
      { name: 'Sale 1', email: 'sale1@taviweb.com', role: 'sale', password_hash: pass, tenant_id: superAdminTenantId },
      { name: 'Sale 2', email: 'sale2@taviweb.com', role: 'sale', password_hash: pass, tenant_id: superAdminTenantId },
      { name: 'Sale 3', email: 'sale3@taviweb.com', role: 'sale', password_hash: pass, tenant_id: superAdminTenantId }
    ];
    
    const saleIds = [];
    for(const s of sales) {
       let res = await client.query(`SELECT id FROM crm_users WHERE email = $1`, [s.email]);
       if (res.rows.length === 0) {
          const insert2 = await client.query(`
             INSERT INTO crm_users (name, email, role, password_hash, tenant_id)
             VALUES ($1, $2, $3, $4, $5) RETURNING id;
          `, [s.name, s.email, s.role, s.password_hash, s.tenant_id]);
          saleIds.push(insert2.rows[0].id);
       } else {
          saleIds.push(res.rows[0].id);
       }
    }
    
    console.log('Sale IDs:', saleIds);
    
    // Distribute the 200 leads
    const res = await client.query(`
      SELECT l.id FROM leads l
      JOIN tenants t ON l.id = t.id
      WHERE t.slug != 'tavi' AND t.slug != 'tavi-old'
    `);
    
    const vipLeadIds = res.rows.map(r => r.id);
    console.log('Found VIP Leads:', vipLeadIds.length);
    
    for(let i = 0; i < vipLeadIds.length; i++) {
       const saleId = saleIds[i % 3];
       await client.query(`
          UPDATE leads SET assigned_to = $1 WHERE id = $2
       `, [saleId, vipLeadIds[i]]);
    }
    
    console.log('Distributed leads successfully');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

setupDb();
