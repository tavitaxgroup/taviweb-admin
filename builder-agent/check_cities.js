require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const extractCityDistrict = (address) => {
  if (!address) return { city: '', district: '' };
  // Loại bỏ "Vietnam" hoặc "Việt Nam" nếu có ở cuối
  let addr = address.replace(/,?\s*(Việt Nam|Vietnam)\s*$/i, '');
  const parts = addr.split(',').map(p => p.trim());
  
  if (parts.length >= 2) {
    const city = parts[parts.length - 1];
    const district = parts[parts.length - 2];
    return { city, district };
  } else if (parts.length === 1) {
    return { city: parts[0], district: '' };
  }
  return { city: '', district: '' };
};

async function run() {
  const { data, error } = await supabase.from('leads').select('formatted_address');
  if (error) {
    console.error(error);
    return;
  }
  
  const cities = new Set();
  data.forEach(lead => {
    const { city } = extractCityDistrict(lead.formatted_address);
    cities.add(city);
  });
  
  console.log(Array.from(cities).sort());
}

run();
