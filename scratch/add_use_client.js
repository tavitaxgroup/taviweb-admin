const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.match(/use(State|Effect|Ref|Callback|Memo|Router|Pathname|SearchParams)/) && !content.includes('"use client"')) {
        content = '"use client";\n' + content;
        fs.writeFileSync(fullPath, content);
        console.log(`Added "use client" to ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, '../builder-agent/src/template-sources'));
console.log('Done');
