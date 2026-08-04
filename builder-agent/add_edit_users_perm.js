require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    // Add edit_users to any role that has manage_users
    const { rowCount } = await client.query(`
      UPDATE crm_roles
      SET permissions = permissions || '["edit_users"]'::jsonb
      WHERE permissions ? 'manage_users' AND NOT (permissions ? 'edit_users');
    `);
    console.log('Updated ' + rowCount + ' roles to include edit_users permission.');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
