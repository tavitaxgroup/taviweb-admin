require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('leads').select('id, name, formatted_address');
  if (error) {
    console.error(error);
    return;
  }
  
  const badRecords = data.filter(d => {
    const addr = d.formatted_address || '';
    const name = d.name || '';
    // Check for rating patterns like 4,8(275) or weird words
    return /Mở cả ngày|Đóng cửa|Mở cửa|·|\(\d+\)/i.test(addr) || /Mở cả ngày|Đóng cửa|Mở cửa|·/.test(name);
  });

  console.log("Deleting bad records:", badRecords.length);
  if(badRecords.length > 0) {
    const ids = badRecords.map(d => d.id);
    // Batched delete
    for (let i = 0; i < ids.length; i += 50) {
        const batch = ids.slice(i, i + 50);
        await supabase.from('leads').delete().in('id', batch);
    }
    console.log("Deleted successfully.");
  }
}

run();
