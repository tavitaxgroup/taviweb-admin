require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('leads').select('id, name, formatted_address').or('formatted_address.ilike.%Mở cả ngày%,name.ilike.%Mở cả ngày%,formatted_address.ilike.%Dưỡng Sinh Cô Ba%');
  if (error) {
    console.error(error);
  } else {
    console.log("Deleting bad records:", data.length);
    if(data.length > 0) {
      console.log(data);
      const ids = data.map(d => d.id);
      await supabase.from('leads').delete().in('id', ids);
    }
  }
}

run();
