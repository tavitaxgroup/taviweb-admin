import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;

async function alterTable() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    await client.query("ALTER TABLE leads ADD COLUMN IF NOT EXISTS sales_status TEXT DEFAULT 'chưa sale'");
    console.log("Added sales_status column successfully.");
  } catch (error) {
    console.error("Error altering table:", error);
  } finally {
    await client.end();
  }
}

alterTable();
