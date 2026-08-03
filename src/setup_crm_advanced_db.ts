import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function setupAdvancedDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database for Advanced Setup');

    const sql = `
      -- Danh mục Sản phẩm / Dịch vụ
      CREATE TABLE IF NOT EXISTS crm_products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        price NUMERIC NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Báo giá
      CREATE TABLE IF NOT EXISTS crm_quotes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        deal_id UUID REFERENCES crm_deals(id) ON DELETE CASCADE,
        status TEXT NOT NULL DEFAULT 'draft', -- draft, sent, accepted, rejected
        total_amount NUMERIC NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Chi tiết báo giá (Gói nào, số lượng, thành tiền)
      CREATE TABLE IF NOT EXISTS crm_quote_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        quote_id UUID REFERENCES crm_quotes(id) ON DELETE CASCADE,
        product_id UUID REFERENCES crm_products(id) ON DELETE SET NULL,
        product_name TEXT NOT NULL, -- Lưu lại tên lúc báo giá phòng khi product bị xóa/đổi tên
        quantity INTEGER NOT NULL DEFAULT 1,
        unit_price NUMERIC NOT NULL DEFAULT 0,
        total NUMERIC NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- KPI của Sales
      CREATE TABLE IF NOT EXISTS crm_kpis (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES crm_users(id) ON DELETE CASCADE,
        target_revenue NUMERIC NOT NULL DEFAULT 0,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, month, year)
      );

      ALTER TABLE crm_products ENABLE ROW LEVEL SECURITY;
      ALTER TABLE crm_quotes ENABLE ROW LEVEL SECURITY;
      ALTER TABLE crm_quote_items ENABLE ROW LEVEL SECURITY;
      ALTER TABLE crm_kpis ENABLE ROW LEVEL SECURITY;

      -- Tạo policy
      DO $$
      DECLARE
        t text;
      BEGIN
        FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('crm_products', 'crm_quotes', 'crm_quote_items', 'crm_kpis')
        LOOP
          EXECUTE format('DROP POLICY IF EXISTS "Enable all access" ON %I', t);
          EXECUTE format('CREATE POLICY "Enable all access" ON %I FOR ALL USING (true) WITH CHECK (true)', t);
        END LOOP;
      END $$;
    `;

    await client.query(sql);
    console.log('Created advanced tables successfully.');

    // Seed Data cho Products (Cơ bản - Tiêu chuẩn - Nâng cao - Premium)
    const { rows: products } = await client.query('SELECT * FROM crm_products');
    if (products.length === 0) {
      console.log('Seeding default products/services...');
      const services = [
        { name: 'Gói Web Cơ Bản', description: 'Website giới thiệu cơ bản, giao diện mẫu', price: 5000000 },
        { name: 'Gói Web Tiêu Chuẩn', description: 'Website bán hàng, tích hợp giỏ hàng, tùy biến giao diện', price: 12000000 },
        { name: 'Gói Web Nâng Cao', description: 'Hệ thống web tùy chỉnh, tích hợp thanh toán, đa ngôn ngữ', price: 25000000 },
        { name: 'Gói Web Premium', description: 'Hệ thống web độc quyền cao cấp, app mobile đi kèm, bảo mật cao', price: 60000000 },
      ];

      for (const svc of services) {
        await client.query(
          'INSERT INTO crm_products (name, description, price) VALUES ($1, $2, $3)',
          [svc.name, svc.description, svc.price]
        );
      }
      console.log('Product seed done.');
    }

  } catch (error) {
    console.error('Error setting up advanced database:', error);
  } finally {
    await client.end();
  }
}

setupAdvancedDatabase();
