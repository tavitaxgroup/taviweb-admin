const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const excelPath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_Check_Web_Chuoi.xlsx';
const workbook = xlsx.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

const webOrChainClients = data.filter(d => d['Đã Có Website?'] === 'CÓ' || d['Là Hệ Thống/Chuỗi?'] === 'CÓ');

let mdContent = `# Danh Sách Khách Hàng Đã Có Web hoặc Là Chuỗi (${webOrChainClients.length} khách)\n\n`;
mdContent += `Những khách hàng này có thể khó chốt sale hơn vì họ đã có nền tảng trực tuyến riêng hoặc thuộc hệ thống lớn. Tuy nhiên, bạn vẫn có thể chào mời dịch vụ nâng cấp Web hoặc Marketing.\n\n`;

mdContent += `| STT | Tên Doanh Nghiệp | Ngành Nghề | Đã Có Web? | URL | Là Chuỗi? | Dấu Hiệu Chuỗi |\n`;
mdContent += `|:---:|:---|:---|:---:|:---|:---:|:---|\n`;

webOrChainClients.forEach((c, index) => {
  const web = c['Đã Có Website?'] === 'CÓ' ? '✅' : '❌';
  const url = c['Website URL (Nếu có)'] ? `[Link](${c['Website URL (Nếu có)']})` : '';
  const chain = c['Là Hệ Thống/Chuỗi?'] === 'CÓ' ? '✅' : '❌';
  const evidence = c['Dấu hiệu nhận biết'] || '';
  
  mdContent += `| ${index + 1} | **${c['Tên Doanh Nghiệp']}** | ${c['Ngành Nghề']} | ${web} | ${url} | ${chain} | ${evidence} |\n`;
});

const mdPath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Khach_Da_Co_Web_Hoac_Chuoi.md';
fs.writeFileSync(mdPath, mdContent);
console.log("Created markdown for web/chain clients.");
