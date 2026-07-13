require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('leads').select('*').ilike('name', '%0(2.093)%').limit(5);
  if (error) {
    console.error(error);
  } else {
    console.log("Matches:", data);
  }

  const { data: data2 } = await supabase.from('leads').select('*').ilike('industry', '%0(2.093)%').limit(5);
  console.log("Matches in industry:", data2);
}

run();
