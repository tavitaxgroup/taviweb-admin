import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateData() {
  console.log('Bắt đầu đẩy dữ liệu từ JSON lên Supabase...');
  const dataDir = path.join(__dirname, '../src/data/leads');
  
  if (!fs.existsSync(dataDir)) {
    console.log('Thư mục dữ liệu không tồn tại.');
    return;
  }

  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  let totalMigrated = 0;

  for (const file of files) {
    console.log(`Đang xử lý file: ${file}`);
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const leads = JSON.parse(content);
    
    // Add industry from filename
    const industry = file.replace('.json', '');

    for (const lead of leads) {
      if (!lead.place_id) continue;

      const record = {
        place_id: lead.place_id,
        name: lead.name,
        industry: industry,
        formatted_address: lead.formatted_address || null,
        formatted_phone_number: lead.formatted_phone_number || null,
        website: lead.website || null,
        status: lead.status || 'new',
        image_url: lead.image_url || null,
        rating: lead.rating || null,
        user_ratings_total: lead.user_ratings_total || null
      };

      const { error } = await supabase
        .from('leads')
        .upsert(record, { onConflict: 'place_id' });

      if (error) {
        console.error(`[LỖI] khi đẩy lead ${lead.name}:`, error.message);
      } else {
        totalMigrated++;
      }
    }
  }

  console.log(`Đã đẩy thành công ${totalMigrated} khách hàng lên Supabase.`);
}

migrateData();
