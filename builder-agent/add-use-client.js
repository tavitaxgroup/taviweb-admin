const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.match(/useState|useEffect|useRef|onClick|useScroll|framer-motion|motion\/react|lucide-react/)) {
        if (!content.includes('use client')) {
          fs.writeFileSync(fullPath, '"use client";\n' + content, 'utf8');
          console.log('Fixed ' + fullPath);
        }
      }
    }
  }
}

processDir(path.join(__dirname, 'src', 'template-sources'));
console.log('Done');
