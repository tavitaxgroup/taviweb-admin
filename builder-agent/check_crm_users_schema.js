require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const { rows } = await client.query(`
      SELECT column_name, is_nullable, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'crm_users';
    `);
    console.log('crm_users columns:', rows);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
