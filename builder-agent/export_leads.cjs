const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const xlsx = require('xlsx');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

async function exportToExcel() {
  const { data: tenants, error } = await supabase.from('tenants').select('id, name, slug').limit(200);
  
  if (error) {
    console.error('Error fetching data:', error);
    return;
  }
  
  // Format data for Excel
  const formattedData = tenants.map((t, index) => {
    let industry = 'Khác';
    if (t.name.toLowerCase().includes('nội thất')) industry = 'Nội thất';
    else if (t.name.toLowerCase().includes('anh ngữ') || t.name.toLowerCase().includes('tiếng anh')) industry = 'Trung tâm tiếng Anh';
    else if (t.name.toLowerCase().includes('nha khoa')) industry = 'Nha khoa';
    else if (t.name.toLowerCase().includes('thẩm mỹ') || t.name.toLowerCase().includes('spa')) industry = 'Spa / Thẩm mỹ viện';
    
    return {
      'STT': index + 1,
      'Tên Doanh Nghiệp': t.name,
      'Ngành Nghề': industry,
      'Link Demo': `https://${t.slug}.taviweb.com`
    };
  });
  
  const worksheet = xlsx.utils.json_to_sheet(formattedData);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Khach_Hang_Demo");
  
  const filePath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_Da_Sua.xlsx';
  xlsx.writeFile(workbook, filePath);
  
  console.log(`Đã xuất ${formattedData.length} khách hàng ra file Excel.`);
}

exportToExcel();
