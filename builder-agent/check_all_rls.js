require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const { rows: tables } = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public';
    `);

    const { rows: policies } = await client.query(`
      SELECT 
        pg_class.relname AS tablename, 
        polname, 
        polcmd, 
        pg_get_expr(polqual, polrelid) AS qual, 
        pg_get_expr(polwithcheck, polrelid) AS with_check
      FROM pg_policy
      JOIN pg_class ON pg_policy.polrelid = pg_class.oid
      JOIN pg_namespace ON pg_class.relnamespace = pg_namespace.oid
      WHERE pg_namespace.nspname = 'public';
    `);

    // also check which tables have RLS enabled
    const { rows: rlsEnabled } = await client.query(`
      SELECT relname
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE c.relrowsecurity = true AND n.nspname = 'public';
    `);
    const rlsTables = rlsEnabled.map(r => r.relname);

    for (const table of tables) {
      const t = table.tablename;
      const isRls = rlsTables.includes(t);
      const tablePolicies = policies.filter(p => p.tablename === t);
      
      console.log(`\nTable: ${t} (RLS: ${isRls ? 'ON' : 'OFF'})`);
      if (isRls) {
        if (tablePolicies.length === 0) {
          console.log(`  [!] WARNING: RLS is ON but NO policies exist! (All access blocked)`);
        } else {
          tablePolicies.forEach(p => {
            console.log(`  - [${p.polcmd}] ${p.polname} | USING (${p.qual}) | WITH CHECK (${p.with_check})`);
          });
        }
      }
    }
    
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
