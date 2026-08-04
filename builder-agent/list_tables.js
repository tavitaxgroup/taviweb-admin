require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function listTables() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const res = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    console.log(res.rows.map(r => r.table_name));
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
listTables();
