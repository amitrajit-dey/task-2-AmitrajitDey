const ctrl    = require('../controllers/postController');
const setCors = require('../middleware/cors');
const { sendError } = require('../middleware/response');

function postRoutes(req, res) {
  setCors(res);

  const method   = req.method;
  const pathname = req.pathname;

  const idMatch = pathname.match(/^\/api\/posts\/(\d+)$/);

  if (method === 'OPTIONS') {
    res.writeHead(204); return res.end();
  }

  if (pathname === '/api/posts') {
    if (method === 'GET')  return ctrl.getAllPosts(req, res);
    if (method === 'POST') return ctrl.createPost(req, res);
    return sendError(res, 405, `Method ${method} not allowed on /api/posts`);
  }

  if (idMatch) {
    const id = idMatch[1];
    if (method === 'GET') return ctrl.getPostById(req, res, id);
    return sendError(res, 405, `Method ${method} not allowed`);
  }

  sendError(res, 404, 'Route not found');
}

module.exports = postRoutes;