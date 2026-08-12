require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    await client.query(`
      ALTER TABLE public.tenants 
      ADD COLUMN IF NOT EXISTS custom_domain VARCHAR(255) UNIQUE;
    `);
    console.log('Successfully added custom_domain column to tenants table!');
  } catch (err) {
    console.error('Error adding column:', err);
  } finally {
    await client.end();
  }
}

run();
