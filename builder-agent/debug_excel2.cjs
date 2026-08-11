const xlsx = require('xlsx');
const filePath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_Top_200_Leads_VIP.xlsx';

const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

const nameIndex = 0;
let found = 0;
for (let i = 1; i < data.length; i++) {
  if (data[i][nameIndex]) {
    const originalName = data[i][nameIndex].toString();
    if (originalName.includes('(') || originalName.includes('@')) {
      console.log(originalName);
      found++;
    }
  }
}
console.log(`Found ${found}`);
