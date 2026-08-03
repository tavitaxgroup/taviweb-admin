import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Use direct fallback strings if env is missing to bypass issues
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://obobhscyevpxqydjssqj.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhb...'; 

const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data: users, error: userError } = await supabase
    .from('crm_users')
    .select('email, name, role');
    
  console.log("USERS:", users);
  
  // manually create nha-khoa-smile if missing
  if (!users?.find(u => u.email === 'admin@nha-khoa-smile.com')) {
     console.log("Not found, need to insert...");
  }
}

run();
