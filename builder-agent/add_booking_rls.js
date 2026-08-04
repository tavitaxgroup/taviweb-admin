require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    await client.query(`
      -- Booking Resources
      DROP POLICY IF EXISTS "Enable all access" ON booking_resources;
      CREATE POLICY "Enable all access" ON booking_resources FOR ALL USING (true) WITH CHECK (true);
      
      -- Booking Services
      DROP POLICY IF EXISTS "Enable all access" ON booking_services;
      CREATE POLICY "Enable all access" ON booking_services FOR ALL USING (true) WITH CHECK (true);
      
      -- Booking Appointments
      DROP POLICY IF EXISTS "Enable all access" ON booking_appointments;
      CREATE POLICY "Enable all access" ON booking_appointments FOR ALL USING (true) WITH CHECK (true);
      
      -- Tenants: Allow anonymous updates for now (since frontend uses anon key)
      DROP POLICY IF EXISTS "Enable public update for demo" ON tenants;
      CREATE POLICY "Enable public update for demo" ON tenants FOR UPDATE USING (true) WITH CHECK (true);
    `);
    console.log('Successfully created RLS policies for booking tables!');
  } catch (e) {
    console.error('Error creating policies:', e);
  } finally {
    await client.end();
  }
}
run();
