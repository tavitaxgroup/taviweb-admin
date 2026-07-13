require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('leads').select('id, name, formatted_address').ilike('formatted_address', '%Đóng cửa%');
  if (error) {
    console.error(error);
  } else {
    console.log("Deleting bad records (Đóng cửa):", data.length);
    if(data.length > 0) {
      const ids = data.map(d => d.id);
      await supabase.from('leads').delete().in('id', ids);
    }
  }

  const { data: d2 } = await supabase.from('leads').select('id, name, formatted_address').ilike('formatted_address', '%Mở cửa%');
  if(d2 && d2.length > 0) {
    console.log("Deleting bad records (Mở cửa):", d2.length);
    const ids = d2.map(d => d.id);
    await supabase.from('leads').delete().in('id', ids);
  }
}

run();
