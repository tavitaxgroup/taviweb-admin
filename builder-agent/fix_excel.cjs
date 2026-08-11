const xlsx = require('xlsx');

const filePath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_Top_200_Leads_VIP.xlsx';

function cleanName(name) {
  if (!name || typeof name !== 'string') return name;
  // Xóa dạng (@username)
  return name.replace(/\s*\(@[^)]+\)\s*/g, ' ').trim();
}

try {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
  // Giả sử cột Tên là cột đầu tiên (index 0) hoặc cần tìm Header.
  // Data[0] là header
  const headers = data[0];
  const nameIndex = headers.findIndex(h => h && h.toString().toLowerCase().includes('tên'));
  
  if (nameIndex === -1) {
    console.error('Không tìm thấy cột Tên!');
  } else {
    let count = 0;
    for (let i = 1; i < data.length; i++) {
      if (data[i][nameIndex]) {
        const originalName = data[i][nameIndex].toString();
        const cleanedName = cleanName(originalName);
        if (originalName !== cleanedName) {
          data[i][nameIndex] = cleanedName;
          count++;
        }
      }
    }
    
    console.log(`Đã sửa ${count} tên.`);
    
    const newWorksheet = xlsx.utils.aoa_to_sheet(data);
    workbook.Sheets[sheetName] = newWorksheet;
    xlsx.writeFile(workbook, filePath);
    console.log('Đã lưu file thành công!');
  }
} catch (error) {
  console.error('Lỗi xử lý file:', error);
}
