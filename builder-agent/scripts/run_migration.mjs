import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

const sql = postgres(process.env.DATABASE_URL);
const scriptPath = path.join(process.cwd(), 'scripts', 'crm_dynamic_setup.sql');
const script = fs.readFileSync(scriptPath, 'utf8');

async function main() {
  try {
    await sql.unsafe(script);
    console.log("Migration applied successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    process.exit(0);
  }
}
main();
