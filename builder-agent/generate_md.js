const fs = require('fs');
const leads = JSON.parse(fs.readFileSync('top_100_leads.json', 'utf8'));

let md = '# 🎯 Top 100 Khách Hàng Tiềm Năng (Đã Cào)\n\n';
md += 'Dưới đây là danh sách 100 khách hàng tiềm năng nhất được lấy từ database (được ưu tiên có Số điện thoại, Website và Đánh giá cao).\n\n';

md += '| Tên Doanh Nghiệp | Ngành Nghề | Số Điện Thoại | Website/Fanpage | Rating |\n';
md += '|---|---|---|---|---|\n';

leads.forEach(lead => {
  const name = (lead.name || '').replace(/\|/g, '-');
  const industry = (lead.industry || '').replace(/\|/g, '-');
  const phone = (lead.phone || '').replace('Phone: ', '').replace(/\|/g, '-');
  const website = lead.website ? `[Link](${lead.website})` : '';
  const rating = lead.rating || '-';
  
  md += `| ${name} | ${industry} | ${phone} | ${website} | ${rating} ⭐ |\n`;
});

fs.writeFileSync('top_leads_content.txt', md);
