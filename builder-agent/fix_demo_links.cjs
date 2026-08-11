const xlsx = require('xlsx');
const fs = require('fs');

function fixLinks() {
  const excelPath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_4_Nganh_Chi_Tiet.xlsx';
  const mdPath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_4_Nganh.md';
  
  // 1. Fix Excel
  const workbook = xlsx.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  
  data.forEach(row => {
    if (row['Link Demo'] && row['Link Demo'].includes('.taviweb.com')) {
      // Extract slug from https://slug.taviweb.com
      const match = row['Link Demo'].match(/https:\/\/(.+)\.taviweb\.com/);
      if (match && match[1]) {
        row['Link Demo'] = `https://taviweb.vercel.app/${match[1]}`;
      }
    }
  });
  
  const newWorksheet = xlsx.utils.json_to_sheet(data);
  const newWorkbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "200_Khach_4_Nganh");
  xlsx.writeFile(newWorkbook, excelPath);
  console.log('Fixed links in Excel.');
  
  // 2. Fix Markdown
  let mdContent = '# Danh Sách 200 Khách Hàng Tiềm Năng (4 Ngành Trọng Điểm)\n\n';
  const industries = ['Spa / Thẩm mỹ viện', 'Nha khoa', 'Trung tâm Anh ngữ', 'Phòng khám'];
  
  for (const ind of industries) {
    const clients = data.filter(d => d['Ngành Nghề'] === ind);
    
    mdContent += `## 🔹 ${ind} (${clients.length} khách hàng)\n\n`;
    mdContent += `| STT | Tên Doanh Nghiệp | Số Điện Thoại | Link Fanpage | Link Demo |\n`;
    mdContent += `|:---:|:---|:---|:---|:---|\n`;
    
    clients.forEach((c, index) => {
      const fanpage = c['Fanpage'] || '';
      const demo = c['Link Demo'] || '';
      mdContent += `| ${index + 1} | **${c['Tên Doanh Nghiệp']}** | ${c['Số Điện Thoại']} | [Fanpage](${fanpage}) | [Xem Demo](${demo}) |\n`;
    });
    
    mdContent += '\n---\n\n';
  }
  
  fs.writeFileSync(mdPath, mdContent);
  console.log('Fixed links in Markdown.');
}

fixLinks();
