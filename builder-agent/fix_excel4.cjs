const xlsx = require('xlsx');

const filePath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_Top_200_Leads_VIP.xlsx';

function cleanName(name) {
  if (!name || typeof name !== 'string') return name;
  // 1. Loại bỏ tất cả dấu gạch ngang '-' vì dữ liệu bị lỗi "-V-ă-n-"
  let cleaned = name.replace(/-/g, '');
  
  // 2. Loại bỏ (@username)
  cleaned = cleaned.replace(/\(@[^)]+\)/g, ' ');
  
  // 3. Loại bỏ dấu chấm tròn (•) hoặc các ký tự thừa ở cuối
  cleaned = cleaned.replace(/•/g, ' ');
  
  // 4. Xóa khoảng trắng thừa
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

function cleanPhone(phone) {
  if (!phone || typeof phone !== 'string') return phone;
  let cleaned = phone.replace(/-/g, '');
  cleaned = cleaned.replace(/\s+/g, '').trim();
  return cleaned;
}

try {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
  const headers = data[0];
  const nameIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('tên'));
  const phoneIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('điện thoại'));
  
  let countName = 0;
  let countPhone = 0;
  
  for (let i = 1; i < data.length; i++) {
    if (nameIndex !== -1 && data[i][nameIndex]) {
      const original = data[i][nameIndex].toString();
      const cleaned = cleanName(original);
      if (original !== cleaned) {
        data[i][nameIndex] = cleaned;
        countName++;
      }
    }
    
    if (phoneIndex !== -1 && data[i][phoneIndex]) {
      const original = data[i][phoneIndex].toString();
      const cleaned = cleanPhone(original);
      if (original !== cleaned) {
        data[i][phoneIndex] = cleaned;
        countPhone++;
      }
    }
  }
  
  console.log(`Đã sửa ${countName} tên và ${countPhone} số điện thoại.`);
  
  const newWorksheet = xlsx.utils.aoa_to_sheet(data);
  workbook.Sheets[sheetName] = newWorksheet;
  xlsx.writeFile(workbook, filePath);
  console.log('Đã lưu file thành công!');
  
  // Log vài mẫu để kiểm tra
  console.log('Mẫu sau khi sửa:');
  for (let i = 1; i < 5; i++) {
    console.log(data[i][nameIndex], ' - ', data[i][phoneIndex]);
  }
} catch (error) {
  console.error('Lỗi xử lý file:', error);
}
