require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const queries = [
      "UPDATE tenants SET template_key = 'noi_that' WHERE template_key = 'interior-design'",
      "UPDATE tenants SET template_key = 'trung_tam_tieng_anh' WHERE template_key = 'english-center'",
      "UPDATE tenants SET template_key = 'nha_khoa' WHERE template_key = 'dental'",
      "UPDATE tenants SET template_key = 'luat_su' WHERE template_key = 'law-firm'"
    ];
    
    for (const q of queries) {
      const res = await client.query(q);
      console.log(`Executed: ${q} - Updated ${res.rowCount} rows`);
    }
    
    console.log('Fixed template keys for all demo sites.');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
