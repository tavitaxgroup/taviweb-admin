require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('leads').select('*').ilike('name', '%Đang mở cửa%');
  console.log("Name matches:", data?.length);

  const { data: d2 } = await supabase.from('leads').select('*').ilike('industry', '%Đang mở cửa%');
  console.log("Industry matches:", d2?.length);

  const { data: d3 } = await supabase.from('leads').select('*').ilike('formatted_address', '%Đang mở cửa%');
  console.log("Address matches:", d3?.length);

  const { data: d4 } = await supabase.from('leads').select('*').ilike('name', '%Phòng khám%');
  console.log("Name Ph\u00f2ng kh\u00e1m:", d4?.length);
  
  if (d4 && d4.length > 0) {
      console.log(d4[0]);
  }
}

run();
