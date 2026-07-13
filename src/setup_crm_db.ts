import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    const sql = `
      CREATE TABLE IF NOT EXISTS crm_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL DEFAULT 'sale',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS crm_pipelines (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS crm_stages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        pipeline_id UUID REFERENCES crm_pipelines(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        "order" INTEGER NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS crm_contacts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        website TEXT,
        facebook_url TEXT,
        source TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS crm_deals (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
        stage_id UUID REFERENCES crm_stages(id) ON DELETE SET NULL,
        assignee_id UUID REFERENCES crm_users(id) ON DELETE SET NULL,
        title TEXT NOT NULL,
        value NUMERIC DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS crm_activities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        deal_id UUID REFERENCES crm_deals(id) ON DELETE CASCADE,
        user_id UUID REFERENCES crm_users(id) ON DELETE SET NULL,
        type TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Bật Row Level Security (nếu cần sau này) và cho phép anon key đọc/ghi tự do cho demo
      ALTER TABLE crm_users ENABLE ROW LEVEL SECURITY;
      ALTER TABLE crm_pipelines ENABLE ROW LEVEL SECURITY;
      ALTER TABLE crm_stages ENABLE ROW LEVEL SECURITY;
      ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
      ALTER TABLE crm_deals ENABLE ROW LEVEL SECURITY;
      ALTER TABLE crm_activities ENABLE ROW LEVEL SECURITY;

      -- Tạo policy cho phép tất cả các thao tác (vì ta dùng app client side với anon key hoặc service_role)
      DO $$
      DECLARE
        t text;
      BEGIN
        FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 'crm_%'
        LOOP
          EXECUTE format('DROP POLICY IF EXISTS "Enable all access" ON %I', t);
          EXECUTE format('CREATE POLICY "Enable all access" ON %I FOR ALL USING (true) WITH CHECK (true)', t);
        END LOOP;
      END $$;
    `;

    await client.query(sql);
    console.log('Created tables successfully.');

    // Seed data
    // Kiểm tra xem đã có pipeline nào chưa
    const { rows: pipelines } = await client.query('SELECT * FROM crm_pipelines LIMIT 1');
    if (pipelines.length === 0) {
      console.log('Seeding default pipeline and stages...');
      const { rows: newPipeline } = await client.query(
        "INSERT INTO crm_pipelines (name, description) VALUES ('Default Sales Pipeline', 'Quy trình Sale chuẩn') RETURNING id"
      );
      const pipelineId = newPipeline[0].id;
      
      const stages = [
        { name: 'Khách Mới', order: 1 },
        { name: 'Đã Gọi', order: 2 },
        { name: 'Đã Gửi Báo Giá', order: 3 },
        { name: 'Đang Đàm Phán', order: 4 },
        { name: 'Chốt Deal (Won)', order: 5 },
        { name: 'Từ Chối (Lost)', order: 6 },
      ];

      for (const stage of stages) {
        await client.query(
          'INSERT INTO crm_stages (pipeline_id, name, "order") VALUES ($1, $2, $3)',
          [pipelineId, stage.name, stage.order]
        );
      }
      console.log('Seed done.');
    }

  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await client.end();
  }
}

setupDatabase();
