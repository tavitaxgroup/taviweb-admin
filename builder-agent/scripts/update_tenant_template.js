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
      UPDATE public.tenants 
      SET template_key = 'salon_toc' 
      WHERE slug = 'pro-demo' OR template_key IS NULL;
    `);
    console.log('Successfully updated template_key for pro-demo tenant!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
