require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const sql = `
      CREATE OR REPLACE FUNCTION check_double_booking()
      RETURNS TRIGGER AS $$
      BEGIN
          IF EXISTS (
              SELECT 1
              FROM public.booking_appointments
              WHERE tenant_id = NEW.tenant_id
                AND resource_id = NEW.resource_id
                AND id != NEW.id
                AND status != 'cancelled'
                AND (
                  (NEW.start_time >= start_time AND NEW.start_time < end_time)
                  OR
                  (NEW.end_time > start_time AND NEW.end_time <= end_time)
                  OR
                  (NEW.start_time <= start_time AND NEW.end_time >= end_time)
                )
          ) THEN
              RAISE EXCEPTION 'double_booking_error';
          END IF;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS trg_check_double_booking ON public.booking_appointments;

      CREATE TRIGGER trg_check_double_booking
      BEFORE INSERT OR UPDATE ON public.booking_appointments
      FOR EACH ROW
      WHEN (NEW.resource_id IS NOT NULL AND NEW.status != 'cancelled')
      EXECUTE FUNCTION check_double_booking();
    `;

    await client.query(sql);
    console.log('Successfully created Trigger for double-booking!');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
