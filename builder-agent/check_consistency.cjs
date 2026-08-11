const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDataConsistency() {
  console.log("Fetching leads...");
  const { data: leads, error: leadErr } = await supabase.from('leads').select('id, name, industry');
  if (leadErr) {
    console.error("Error fetching leads:", leadErr);
    return;
  }
  
  console.log("Fetching tenants...");
  const { data: tenants, error: tenantErr } = await supabase.from('tenants').select('id, name, slug, template_key');
  if (tenantErr) {
    console.error("Error fetching tenants:", tenantErr);
    return;
  }
  
  console.log(`\n=== TỔNG QUAN DỮ LIỆU ===`);
  console.log(`Tổng số Leads (Khách tiềm năng): ${leads.length}`);
  console.log(`Tổng số Tenants (Demo đã tạo): ${tenants.length}`);
  
  // Cross check how many tenants match leads by name
  let matchedCount = 0;
  let unmatchedTenants = [];
  
  tenants.forEach(tenant => {
    // In our mock data generation, we updated tenants but we might not have updated leads identically.
    const match = leads.find(l => l.name === tenant.name);
    if (match) {
      matchedCount++;
    } else {
      unmatchedTenants.push(tenant.name);
    }
  });
  
  console.log(`\nSố lượng Demo khớp tên với Khách tiềm năng: ${matchedCount}/${tenants.length}`);
  
  if (unmatchedTenants.length > 0) {
    console.log(`\nCảnh báo: Có ${unmatchedTenants.length} Demo không tìm thấy trong danh sách Leads!`);
    console.log("Một vài Demo không khớp: ", unmatchedTenants.slice(0, 5));
  }
  
  // Check distribution of the 200 tenants
  const distribution = {
    'spa': 0,
    'nha_khoa': 0,
    'trung_tam_tieng_anh': 0,
    'phong_kham': 0,
    'khac': 0
  };
  
  tenants.forEach(t => {
    if (distribution[t.template_key] !== undefined) {
      distribution[t.template_key]++;
    } else {
      distribution['khac']++;
    }
  });
  
  console.log(`\n=== PHÂN BỔ NGÀNH NGHỀ CỦA DEMO TỒN TẠI ===`);
  console.log(`Spa / Thẩm mỹ viện: ${distribution['spa']}`);
  console.log(`Nha khoa: ${distribution['nha_khoa']}`);
  console.log(`Trung tâm Anh ngữ: ${distribution['trung_tam_tieng_anh']}`);
  console.log(`Phòng khám: ${distribution['phong_kham']}`);
  console.log(`Các ngành khác (Lỗi/Chưa update): ${distribution['khac']}`);
}

checkDataConsistency();
