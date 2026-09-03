const fs = require('fs');
const code = fs.readFileSync('target_js.js', 'utf8');
const strings = [...code.matchAll(/"([^"]{10,})"/g)].map(m => m[1]);
const uniqueStrings = [...new Set(strings)];
fs.writeFileSync('strings_node.txt', uniqueStrings.join('\n'));
