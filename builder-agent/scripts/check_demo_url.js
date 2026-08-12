require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const res = await client.query(`
      SELECT l.name, l.demo_url, t.slug, t.custom_domain
      FROM leads l
      JOIN tenants t ON l.name = t.name
      LIMIT 10
    `);
    console.log(res.rows);
  } finally {
    await client.end();
  }
}
run();
