const fs = require('fs');
const http = require('http');
const path = require('path');

// Update server.js to serve index.html as default
const serverCode = `const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const ROOT = __dirname;
const MIME = {'.html':'text/html;charset=utf-8','.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
http.createServer((req,res)=>{
  let p = req.url.split('?')[0];
  if(p==='/'||p==='')p='/xai-chip-doctor.html';
  const fp = path.join(ROOT,p);
  const ext = path.extname(fp).toLowerCase();
  const mime = MIME[ext]||'application/octet-stream';
  fs.readFile(fp,(err,data)=>{
    if(err){res.writeHead(404,{'Content-Type':'text/plain'});res.end('404: '+p);return;}
    res.writeHead(200,{'Content-Type':mime});
    res.end(data);
    console.log('[200] '+p);
  });
}).listen(PORT,'127.0.0.1',()=>{
  console.log('');
  console.log('  ========================================');
  console.log('   X-AI Chip Doctor RUNNING!');
  console.log('  ========================================');
  console.log('');
  console.log('  Open in Chrome or Edge:');
  console.log('  http://127.0.0.1:3000');
  console.log('');
});
`;

fs.writeFileSync('server.js', serverCode, 'utf8');
console.log('server.js updated');

// Check xai-chip-doctor.html
const html = fs.readFileSync('xai-chip-doctor.html', 'utf8');
console.log('xai-chip-doctor.html size: ' + html.length + ' chars');
console.log('Has <script>: ' + html.includes('<script>'));
console.log('Has </script>: ' + html.includes('</script>'));
console.log('Has showPage: ' + html.includes('showPage'));
console.log('Has </body>: ' + html.includes('</body>'));
