const ctrl   = require('../controllers/userController');
const setCors = require('../middleware/cors');
const { sendError } = require('../middleware/response');

function userRoutes(req, res) {
  setCors(res);

  const method   = req.method;
  const pathname = req.pathname;

  // Match /api/users/:id
  const idMatch = pathname.match(/^\/api\/users\/(\d+)$/);

  // OPTIONS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204); return res.end();
  }

  // /api/users
  if (pathname === '/api/users') {
    if (method === 'GET')  return ctrl.getAllUsers(req, res);
    if (method === 'POST') return ctrl.createUser(req, res);
    return sendError(res, 405, `Method ${method} not allowed on /api/users`);
  }

  // /api/users/:id
  if (idMatch) {
    const id = idMatch[1];
    if (method === 'GET')    return ctrl.getUserById(req, res, id);
    if (method === 'PUT')    return ctrl.updateUser(req, res, id);
    if (method === 'DELETE') return ctrl.deleteUser(req, res, id);
    return sendError(res, 405, `Method ${method} not allowed`);
  }

  sendError(res, 404, 'Route not found');
}

module.exports = userRoutes;