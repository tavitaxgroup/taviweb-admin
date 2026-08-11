const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let count = 0;
walkDir('src/template-sources', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('onClick=')) {
      if (!content.includes('use client')) {
        fs.writeFileSync(filePath, '"use client";\n\n' + content);
        console.log('Added use client to: ' + filePath);
        count++;
      }
    }
  }
});
console.log('Done. Updated ' + count + ' files.');
