const fs = require('fs');
// Append all pages + JS to app.html
const content = fs.readFileSync('app.html', 'utf8');
fs.writeFileSync('app.html', content + PAGES + JS + CLOSE, 'utf8');
console.log('Done! Total: ' + fs.statSync('app.html').size + ' bytes');
