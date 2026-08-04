require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function checkRLS() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    console.log('--- RLS ENABLED STATUS ---');
    const { rows: tables } = await client.query(`
      SELECT relname, relrowsecurity 
      FROM pg_class 
      WHERE relnamespace = 'public'::regnamespace AND relkind = 'r'
      ORDER BY relname;
    `);
    
    tables.forEach(t => {
      console.log(`Table: ${t.relname.padEnd(20)} | RLS Enabled: ${t.relrowsecurity}`);
    });

    console.log('\n--- ACTIVE POLICIES ---');
    const { rows: policies } = await client.query(`
      SELECT tablename, policyname, roles, cmd, qual, with_check 
      FROM pg_policies 
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname;
    `);
    
    if (policies.length === 0) {
      console.log('NO POLICIES FOUND!');
    } else {
      policies.forEach(p => {
        console.log(`Table: ${p.tablename} | Policy: ${p.policyname} | Cmd: ${p.cmd}`);
        console.log(`  USING: ${p.qual}`);
        if (p.with_check) console.log(`  WITH CHECK: ${p.with_check}`);
        console.log('');
      });
    }

  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
checkRLS();
