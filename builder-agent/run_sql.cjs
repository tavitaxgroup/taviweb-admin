const { Client } = require('pg');
const fs = require('fs');

async function runSql() {
  const connectionString = process.env.DATABASE_URL || "postgresql://postgres.llposvgrqjsrqktahrtw:SwZczgd%21q%233%2Fn.5@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres";
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log("Connected to database");
    
    const sql = fs.readFileSync(process.argv[2], 'utf8');
    await client.query(sql);
    console.log("SQL executed successfully!");
    
  } catch (err) {
    console.error("Error executing SQL:", err);
  } finally {
    await client.end();
  }
}

runSql();
