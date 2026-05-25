const http   = require('http');
const config = require('./config/config');
const router = require('./routes/index');
const logger = require('./middleware/logger');

const server = http.createServer((req, res) => {

  logger(req);

  req.parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  req.pathname  = req.parsedUrl.pathname;

  let rawBody = '';
  req.on('data', chunk => { rawBody += chunk.toString(); });
  req.on('end', () => {
    if (rawBody) {
      try   { req.body = JSON.parse(rawBody); }
      catch { req.body = {}; }
    } else {
      req.body = {};
    }
    router(req, res);
  });
});

server.listen(config.PORT, () => {
  console.log(`\n  DecodeLabs Project 2 API`);
  console.log(`  Server running → http://localhost:${config.PORT}/api`);
  console.log(`  ENV: ${config.NODE_ENV}\n`);
  console.log('  Endpoints:');
  console.log('  GET    /api/health');
  console.log('  GET    /api/users');
  console.log('  GET    /api/users/:id');
  console.log('  POST   /api/users');
  console.log('  PUT    /api/users/:id');
  console.log('  DELETE /api/users/:id');
  console.log('  GET    /api/posts');
  console.log('  GET    /api/posts/:id');
  console.log('  POST   /api/posts\n');
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});