import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envStr = fs.readFileSync(path.join(__dirname, '../../.env'), 'utf8');
const dbUrlMatch = envStr.match(/DATABASE_URL="([^"]+)"/);
const dbUrl = dbUrlMatch ? dbUrlMatch[1] : null;

if (!dbUrl) {
  console.error("No DATABASE_URL found in .env");
  process.exit(1);
}

const sql = postgres(dbUrl);
const sqlStr = fs.readFileSync(path.join(__dirname, 'crm_rbac_setup.sql'), 'utf8');

async function run() {
  try {
    await sql.unsafe(sqlStr);
    console.log("SQL Executed Successfully!");
  } catch(e) {
    console.error("Error executing SQL:", e);
  } finally {
    await sql.end();
  }
}

run();
