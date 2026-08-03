const { Client } = require('pg');
const connectionString = "postgresql://postgres.llposvgrqjsrqktahrtw:SwZczgd%21q%233%2Fn.5@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres";

const sql = `
CREATE TABLE IF NOT EXISTS booking_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'staff', 'table', 'room'
  role_or_capacity TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS booking_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER DEFAULT 60,
  price NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS booking_appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  resource_id UUID REFERENCES booking_resources(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  service_id UUID REFERENCES booking_services(id) ON DELETE SET NULL,
  service_name TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS and setup basic policies (optional for now, as we bypass via service role)
ALTER TABLE booking_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_appointments ENABLE ROW LEVEL SECURITY;

-- If using anon key, we would need policies. For service role, it bypasses RLS.
`;

async function run() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log("Connected to DB, running DDL...");
    await client.query(sql);
    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error running DDL:", err);
  } finally {
    await client.end();
  }
}

run();
