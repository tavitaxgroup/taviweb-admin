const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const xlsx = require('xlsx');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

const industries = [
  { prefix: 'Thẩm mỹ viện', tag: 'spa', display: 'Spa / Thẩm mỹ viện', slugs: 'tham-my-vien' },
  { prefix: 'Nha khoa', tag: 'nha_khoa', display: 'Nha khoa', slugs: 'nha-khoa' },
  { prefix: 'Trung tâm Anh ngữ', tag: 'trung_tam_tieng_anh', display: 'Trung tâm Anh ngữ', slugs: 'trung-tam-anh-ngu' },
  { prefix: 'Phòng khám', tag: 'phong_kham', display: 'Phòng khám', slugs: 'phong-kham' }
];

const firstNames = ['Hoàng', 'Minh', 'Gia', 'Bảo', 'Tâm', 'Thành', 'Hưng', 'Phát', 'Việt', 'An', 'Trí', 'Đức', 'Phương', 'Lan', 'Ngọc'];
const lastNames = ['Phát', 'Đạt', 'Group', 'Global', 'Vina', 'Plus', 'Pro', 'Khánh', 'Khang', 'Long', 'Thịnh', 'Vượng', 'Luxury', 'Beauty', 'Care', 'Smile', 'Medical', 'Education', 'Edu'];
const streets = ['Lê Lợi', 'Nguyễn Huệ', 'Trần Hưng Đạo', 'Phan Đăng Lưu', 'Điện Biên Phủ', 'Cách Mạng Tháng Tám', 'Nguyễn Trãi', 'Lê Văn Sỹ', 'Hai Bà Trưng', 'Pasteur'];
const cities = ['Quận 1, TP.HCM', 'Quận 3, TP.HCM', 'Quận 10, TP.HCM', 'Tân Bình, TP.HCM', 'Hoàn Kiếm, Hà Nội', 'Cầu Giấy, Hà Nội', 'Hải Châu, Đà Nẵng'];

function generateRandomName(industryPrefix) {
  const name = firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${industryPrefix} ${name}`;
}

function generatePhone() {
  const prefixes = ['09', '08', '07', '03'];
  const p = prefixes[Math.floor(Math.random() * prefixes.length)];
  const body = Math.floor(10000000 + Math.random() * 90000000);
  return `${p}${body}`;
}

function generateAddress() {
  const num = Math.floor(1 + Math.random() * 200);
  const street = streets[Math.floor(Math.random() * streets.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  return `${num} ${street}, ${city}`;
}

function stringToSlug(str) {
  str = str.toLowerCase();
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');
  str = str.replace(/([^0-9a-z-\s])/g, '');
  str = str.replace(/(\s+)/g, '-');
  str = str.replace(/^-+/g, '');
  str = str.replace(/-+$/g, '');
  return str;
}

async function fixDistribution() {
  console.log('Fetching 200 tenants...');
  const { data: tenants, error: err1 } = await supabase.from('tenants').select('id, name').limit(200);
  if (err1) {
    console.error(err1);
    return;
  }
  
  const formattedData = [];
  
  let i = 0;
  for (const tenant of tenants) {
    const ind = industries[i % 4];
    const newName = generateRandomName(ind.prefix);
    const phone = generatePhone();
    const address = generateAddress();
    const slug = stringToSlug(newName);
    
    // Update tenant name
    await supabase.from('tenants').update({ name: newName, slug: slug }).eq('id', tenant.id);
    
    formattedData.push({
      'STT': i + 1,
      'Tên Doanh Nghiệp': newName,
      'Ngành Nghề': ind.display,
      'Số Điện Thoại': phone,
      'Địa Chỉ': address,
      'Fanpage': `https://www.facebook.com/${slug.replace(/-/g, '')}`,
      'Link Demo': `https://${slug}.taviweb.com`,
      'Đánh giá': `${(4 + Math.random()).toFixed(1)} ⭐`,
      'Trạng Thái CRM': 'Mới'
    });
    
    i++;
  }
  
  console.log(`Updated 200 tenants and generated detailed data.`);
  
  const worksheet = xlsx.utils.json_to_sheet(formattedData);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "200_Khach_4_Nganh");
  
  const filePath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_4_Nganh_Chi_Tiet.xlsx';
  xlsx.writeFile(workbook, filePath);
  
  console.log(`Đã xuất 200 khách hàng chi tiết ra file Excel.`);
}

fixDistribution();
