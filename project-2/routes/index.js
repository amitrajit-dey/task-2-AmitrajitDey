const userRoutes  = require('./userRoutes');
const postRoutes  = require('./postRoutes');
const setCors     = require('../middleware/cors');
const { sendSuccess, sendError } = require('../middleware/response');

function router(req, res) {
  const pathname = req.pathname;

  // ── Health check ──────────────────────────────────────────
  if (pathname === '/api/health') {
    setCors(res);
    return sendSuccess(res, 200, 'API is healthy ✅', {
      uptime : process.uptime().toFixed(2) + 's',
      memory : process.memoryUsage().heapUsed,
      version: '1.0.0',
    });
  }

  // ── User routes ───────────────────────────────────────────
  if (pathname.startsWith('/api/users')) {
    return userRoutes(req, res);
  }

  // ── Post routes ───────────────────────────────────────────
  if (pathname.startsWith('/api/posts')) {
    return postRoutes(req, res);
  }

  // ── 404 fallback ──────────────────────────────────────────
  setCors(res);
  sendError(res, 404, `Cannot ${req.method} ${pathname}`);
}

module.exports = router;