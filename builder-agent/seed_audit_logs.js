require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const { rows: tenantRows } = await client.query('SELECT id FROM tenants LIMIT 1');
    const tenantId = tenantRows.length > 0 ? tenantRows[0].id : '00000000-0000-0000-0000-000000000000';

    const { rows: userRows } = await client.query('SELECT id FROM crm_users LIMIT 1');
    const userId = userRows.length > 0 ? userRows[0].id : null;

    const dummyLogs = [
      { module: 'AUTH', action: 'LOGIN', description: 'Đăng nhập vào hệ thống', entity_type: 'USER', entity_id: userId },
      { module: 'SETTINGS', action: 'CREATE', description: 'Tạo tài khoản nhân viên mới', entity_type: 'USER', entity_id: null },
      { module: 'CRM', action: 'CREATE', description: 'Tạo cơ hội (Deal) mới', entity_type: 'DEAL', entity_id: null },
      { module: 'LEADS', action: 'CREATE', description: 'Tiếp nhận Lead mới từ landing page', entity_type: 'LEAD', entity_id: null },
      { module: 'SETTINGS', action: 'UPDATE', description: 'Cập nhật phân quyền hệ thống', entity_type: 'ROLE', entity_id: null }
    ];

    for (const log of dummyLogs) {
      await client.query(`
        INSERT INTO system_audit_logs (user_id, module, action, description, entity_type, entity_id, tenant_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [userId, log.module, log.action, log.description, log.entity_type, log.entity_id, tenantId]);
    }
    console.log('Inserted dummy logs successfully.');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
