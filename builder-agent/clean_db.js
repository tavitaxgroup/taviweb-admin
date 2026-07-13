require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('leads').select('id, name, formatted_address').ilike('formatted_address', '%Đang mở cửa%');
  if (error) {
    console.error(error);
  } else {
    console.log("Deleting bad records:", data.length);
    const ids = data.map(d => d.id);
    const { error: delError } = await supabase.from('leads').delete().in('id', ids);
    if (delError) console.error("Delete error", delError);
    else console.log("Deleted successfully");
  }
}

run();
