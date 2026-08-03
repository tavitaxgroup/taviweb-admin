const { Client } = require('pg');
require('dotenv').config({ path: 'c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  try {
    await client.connect();
    await client.query(`ALTER TABLE public.tenants ADD COLUMN IF NOT EXISTS system_prompt TEXT;`);
    console.log('SQL executed successfully!');
  } catch (err) {
    console.error('Error running SQL:', err);
  } finally {
    await client.end();
  }
}

run();
