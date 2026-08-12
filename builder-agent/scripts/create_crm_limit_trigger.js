require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    const createTriggerSql = `
      CREATE OR REPLACE FUNCTION check_crm_user_limit()
      RETURNS TRIGGER AS $$
      DECLARE
        current_user_count INT;
        pkg_name VARCHAR;
        max_users INT;
      BEGIN
        -- Đếm số lượng user hiện tại của tenant
        SELECT COUNT(*) INTO current_user_count 
        FROM public.crm_users 
        WHERE tenant_id = NEW.tenant_id;

        -- Lấy gói cước của tenant
        SELECT package_name INTO pkg_name 
        FROM public.tenants 
        WHERE id = NEW.tenant_id;

        -- Xác định giới hạn dựa trên gói
        IF pkg_name ILIKE '%super%' THEN
          max_users := 1000;
        ELSIF pkg_name ILIKE '%pro%' THEN
          max_users := 100;
        ELSIF pkg_name ILIKE '%starter%' THEN
          max_users := 10;
        ELSE
          max_users := 10; -- Mặc định là Starter
        END IF;

        -- Kiểm tra giới hạn
        IF current_user_count >= max_users THEN
          RAISE EXCEPTION 'limit_exceeded:%', max_users USING ERRCODE = 'P0001';
        END IF;

        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS trg_check_crm_user_limit ON public.crm_users;
      CREATE TRIGGER trg_check_crm_user_limit
      BEFORE INSERT ON public.crm_users
      FOR EACH ROW
      EXECUTE FUNCTION check_crm_user_limit();
    `;

    console.log('Applying trigger check_crm_user_limit...');
    await client.query(createTriggerSql);
    console.log('Successfully created Trigger for CRM User Limits!');

  } catch (err) {
    console.error('Error applying trigger:', err);
  } finally {
    await client.end();
  }
}

run();
