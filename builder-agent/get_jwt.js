require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function getJwtSecret() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const res = await client.query("SHOW pgrst.jwt_secret;");
    console.log('JWT Secret:', res.rows[0]);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
getJwtSecret();
