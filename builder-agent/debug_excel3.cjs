const xlsx = require('xlsx');
const filePath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_Top_200_Leads_VIP.xlsx';

const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

const s = data[1][0].toString();
for(let i=0; i<Math.min(s.length, 20); i++) {
  console.log(s[i], s.charCodeAt(i));
}
