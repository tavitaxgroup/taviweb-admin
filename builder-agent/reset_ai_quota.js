const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to DB');
    
    const result = await client.query(`
      UPDATE public.tenants 
      SET ai_quota = 10000000, ai_used = 0;
    `);
    
    console.log(`Updated ${result.rowCount} tenants. AI Quota reset.`);
  } catch (err) {
    console.error('Error running SQL:', err);
  } finally {
    await client.end();
  }
}

run();
