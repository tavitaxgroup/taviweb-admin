const xlsx = require('xlsx');
const fs = require('fs');

function generateMarkdown() {
  const filePath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_4_Nganh_Chi_Tiet.xlsx';
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const data = xlsx.utils.sheet_to_json(worksheet);
  
  let mdContent = '# Danh Sách 200 Khách Hàng Tiềm Năng (4 Ngành Trọng Điểm)\n\n';
  
  // Group by industry to make it readable
  const industries = ['Spa / Thẩm mỹ viện', 'Nha khoa', 'Trung tâm Anh ngữ', 'Phòng khám'];
  
  for (const ind of industries) {
    const clients = data.filter(d => d['Ngành Nghề'] === ind);
    
    mdContent += `## 🔹 ${ind} (${clients.length} khách hàng)\n\n`;
    mdContent += `| STT | Tên Doanh Nghiệp | Số Điện Thoại | Link Fanpage | Link Demo |\n`;
    mdContent += `|:---:|:---|:---|:---|:---|\n`;
    
    clients.forEach((c, index) => {
      // Clean up the URL formats for Markdown to prevent broken links
      const fanpage = c['Fanpage'] || '';
      const demo = c['Link Demo'] || '';
      mdContent += `| ${index + 1} | **${c['Tên Doanh Nghiệp']}** | ${c['Số Điện Thoại']} | [Fanpage](${fanpage}) | [Xem Demo](${demo}) |\n`;
    });
    
    mdContent += '\n---\n\n';
  }
  
  const mdPath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_4_Nganh.md';
  fs.writeFileSync(mdPath, mdContent);
  console.log('Generated markdown file.');
}

generateMarkdown();
