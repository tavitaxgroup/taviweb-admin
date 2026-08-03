require('dotenv').config({path: '.env.local'});
const { Client } = require('pg');

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  try {
    await client.connect();
    
    // Create crm_courses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS crm_courses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        description TEXT,
        price NUMERIC DEFAULT 0,
        status TEXT DEFAULT 'draft',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    
    // Create crm_classes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS crm_classes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        course_id UUID NOT NULL REFERENCES crm_courses(id) ON DELETE CASCADE,
        teacher_id UUID REFERENCES crm_users(id) ON DELETE SET NULL,
        name TEXT NOT NULL,
        schedule_desc TEXT,
        google_meet_link TEXT,
        status TEXT DEFAULT 'upcoming',
        start_date TIMESTAMPTZ,
        end_date TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Create crm_enrollments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS crm_enrollments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        contact_id UUID NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
        class_id UUID NOT NULL REFERENCES crm_classes(id) ON DELETE CASCADE,
        deal_id UUID REFERENCES crm_deals(id) ON DELETE SET NULL,
        payment_status TEXT DEFAULT 'pending',
        amount_paid NUMERIC DEFAULT 0,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Create crm_materials table
    await client.query(`
      CREATE TABLE IF NOT EXISTS crm_materials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        class_id UUID REFERENCES crm_classes(id) ON DELETE CASCADE,
        course_id UUID REFERENCES crm_courses(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        file_url TEXT NOT NULL,
        file_type TEXT,
        is_ai_embedded BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    console.log('Created LMS tables (crm_courses, crm_classes, crm_enrollments, crm_materials)');
    
    // Force reload schema
    await client.query(`NOTIFY pgrst, 'reload schema'`);
    console.log('Reloaded schema cache');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
})();
