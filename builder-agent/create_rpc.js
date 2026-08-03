const postgres = require('postgres');
require('dotenv').config({path: '.env.local'});
const db = postgres(process.env.DATABASE_URL);

async function createRpc() {
  try {
    await db`
      CREATE OR REPLACE FUNCTION increment_ai_used(tenant_id uuid, amount int)
      RETURNS void AS $$
      BEGIN
        UPDATE tenants
        SET ai_used = ai_used + amount
        WHERE id = tenant_id;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;
    console.log("RPC created successfully.");
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
createRpc();
