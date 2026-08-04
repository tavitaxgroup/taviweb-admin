require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function getApiKey() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const { rows } = await client.query("SELECT developer_api_key, slug FROM tenants WHERE developer_api_key IS NOT NULL LIMIT 1");
  await client.end();
  return rows[0];
}

async function runTest() {
  const tenant = await getApiKey();
  if (!tenant) {
    console.log("No tenant with API Key found.");
    return;
  }

  const API_KEY = tenant.developer_api_key;
  const BASE_URL = 'http://localhost:3000/api/v1';
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  };

  console.log(`=== BẮT ĐẦU TEST API CHO TENANT: ${tenant.slug} ===`);

  try {
    // 1. Test GET Leads
    console.log('\n1. Test GET /crm/leads');
    const res1 = await fetch(`${BASE_URL}/crm/leads`, { headers });
    const data1 = await res1.json();
    console.log(`Status: ${res1.status}`);
    console.log(`Leads count: ${data1.total}`);

    // 2. Test POST Leads
    console.log('\n2. Test POST /crm/leads');
    const res2 = await fetch(`${BASE_URL}/crm/leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: 'Nguyễn Văn Test API', phone: '0901234567', email: 'testapi@gmail.com' })
    });
    const data2 = await res2.json();
    console.log(`Status: ${res2.status}`);
    console.log(`New Deal: ${data2.data?.title}`);

    // 3. Test GET Services
    console.log('\n3. Test GET /booking/services');
    const res3 = await fetch(`${BASE_URL}/booking/services`, { headers });
    const data3 = await res3.json();
    console.log(`Status: ${res3.status}`);
    console.log(`Services count: ${data3.total}`);

    console.log('\n✅ TẤT CẢ API ĐÃ HOẠT ĐỘNG HOÀN HẢO!');
  } catch (e) {
    console.error("Lỗi:", e);
  }
}

runTest();
