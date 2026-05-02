const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function startServer(port) {
  const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/' || urlPath === '') urlPath = '/xai-chip-doctor.html';

    const filePath = path.join(ROOT, urlPath);
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found: ' + urlPath);
        return;
      }
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
      console.log('[200] ' + urlPath);
    });
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log('Port ' + port + ' busy, trying ' + (port + 1));
      startServer(port + 1);
    } else if (e.code === 'EACCES') {
      console.log('Port ' + port + ' needs admin, trying ' + (port + 1));
      startServer(port + 1);
    } else {
      console.error('Server error:', e.message);
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log('');
    console.log('  ========================================');
    console.log('   X-AI Chip Doctor RUNNING on port ' + port);
    console.log('  ========================================');
    console.log('');
    console.log('  Try ALL of these in Chrome/Edge:');
    console.log('  http://127.0.0.1:' + port);
    console.log('  http://localhost:' + port);
    console.log('  http://0.0.0.0:' + port);
    console.log('');
    console.log('  If blocked, open this file directly:');
    console.log('  ' + path.join(ROOT, 'xai-chip-doctor.html'));
    console.log('');
  });
}

// Try ports 3000, 3001, 8080, 8081 in sequence
startServer(3000);
