const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/globals.css');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find the line index where the media query closing } on line 628 is
// We want to keep up to and including the @media block closing at line 627 (0-indexed: 626)
// i.e. keep lines 0..627 (the closing } of the @media block), then append a clean note
// The media block structure ends at "  .demo-button {\n    width: 100%;\n  }\n}"
// We need to find the exact cutoff — the closing } of @media (max-width: 620px)

// Strategy: find the index of the broken orphan " z-index: 20;" line and cut everything from there
let cutAt = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'z-index: 20;' && i > 620) {
    // This is the orphaned property from the broken edit — cut starting from previous line
    cutAt = i - 1;
    break;
  }
}

if (cutAt === -1) {
  // fallback: just look for .company-brand which shouldn't be in the file
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('.company-brand')) {
      cutAt = i - 2;
      break;
    }
  }
}

console.log('Cutting at line:', cutAt + 1);
console.log('Line content:', lines[cutAt]);

// Keep lines 0..cutAt, add closing brace if needed, then add comment
// Check if cutAt line ends the media block properly
// We need to ensure the @media block is closed
const kept = lines.slice(0, cutAt);

// Close the @media block and add comment
const newContent = kept.join('\n') + '\n}\n\n/* Company site and gallery page CSS removed — replaced by scoped inline styles in CompanyHome.tsx */\n';

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Done! File trimmed to', kept.length, 'lines');
