require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const crypto = require('crypto');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    // 1. Thêm cột api_key
    await client.query(`
      ALTER TABLE tenants ADD COLUMN IF NOT EXISTS developer_api_key TEXT UNIQUE;
    `);
    console.log("Đã thêm cột developer_api_key vào bảng tenants.");

    // 2. Tạo API Key ngẫu nhiên cho các tenant hiện tại nếu chưa có
    const { rows: tenants } = await client.query('SELECT id, slug FROM tenants WHERE developer_api_key IS NULL');
    for (const t of tenants) {
      const newKey = 'tavi_live_' + crypto.randomBytes(24).toString('hex');
      await client.query('UPDATE tenants SET developer_api_key = $1 WHERE id = $2', [newKey, t.id]);
      console.log(`Đã cấp API Key cho tenant: ${t.slug} -> ${newKey.substring(0, 15)}...`);
    }

  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
