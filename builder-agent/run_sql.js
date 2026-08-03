const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to DB');
    
    // Check if table exists
    const checkTable = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'transactions'
      );
    `);

    if (!checkTable.rows[0].exists) {
      await client.query(`
        CREATE TABLE public.transactions (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
            amount NUMERIC NOT NULL,
            package_name VARCHAR(255) NOT NULL,
            transaction_code VARCHAR(255) UNIQUE,
            status VARCHAR(50) DEFAULT 'PENDING',
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        -- Enable RLS
        ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
        -- Allow service role full access
        CREATE POLICY "Service role full access on transactions" ON public.transactions
            FOR ALL USING (true);
      `);
      console.log('Created transactions table successfully');
    } else {
      console.log('Table transactions already exists');
    }
  } catch (err) {
    console.error('Error running SQL:', err);
  } finally {
    await client.end();
  }
}

run();
