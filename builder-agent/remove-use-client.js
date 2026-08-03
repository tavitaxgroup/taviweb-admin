const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file === 'page.tsx' || file === 'layout.tsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.startsWith('"use client";\n')) {
        fs.writeFileSync(fullPath, content.replace('"use client";\n', ''), 'utf8');
        console.log('Fixed ' + fullPath);
      }
      else if (content.startsWith('\'use client\';\n')) {
        fs.writeFileSync(fullPath, content.replace('\'use client\';\n', ''), 'utf8');
        console.log('Fixed ' + fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, 'src', 'template-sources'));
console.log('Done');
