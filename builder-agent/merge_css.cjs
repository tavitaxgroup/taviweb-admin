const fs = require('fs');

const builderAgentCss = fs.readFileSync('src/app/globals.css', 'utf8');
const taviwebCss = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/scratch/taviweb/src/app/globals.css', 'utf8');

// Strip out the tailwindcss import and @theme from taviwebCss so it doesn't conflict
// Looking at taviweb globals.css, the actual classes start after line 55
// Let's just split by line and keep lines from 56 onwards
const taviwebLines = taviwebCss.split('\n');
const classesOnly = taviwebLines.slice(55).join('\n');

const mergedCss = builderAgentCss + '\n\n/* TAVIWEB CLASSES */\n\n' + classesOnly;

fs.writeFileSync('src/app/globals.css', mergedCss);
console.log('Merged CSS successfully');
