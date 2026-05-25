const db                  = require('../models/db');
const { sendSuccess,
        sendError }       = require('../middleware/response');
const { validateCreateUser,
        validateUpdateUser} = require('../middleware/validator');

function getAllUsers(req, res) {
  const allUsers = db.users.findAll();
  sendSuccess(res, 200, `${allUsers.length} users found`, allUsers);
}

function getUserById(req, res, id) {
  const user = db.users.findById(id);
  if (!user) return sendError(res, 404, `User with id ${id} not found`);
  sendSuccess(res, 200, 'User found', user);
}

function createUser(req, res) {
  const errors = validateCreateUser(req.body);
  if (errors.length > 0)
    return sendError(res, 400, 'Validation failed', errors);

  const exists = db.users.findByEmail(req.body.email);
  if (exists)
    return sendError(res, 409, 'Email already registered');

  const newUser = db.users.create({
    name : req.body.name.trim(),
    email: req.body.email.toLowerCase().trim(),
    role : req.body.role || 'intern',
  });

  sendSuccess(res, 201, 'User created', newUser);
}

function updateUser(req, res, id) {
  const user = db.users.findById(id);
  if (!user) return sendError(res, 404, `User with id ${id} not found`);

  const errors = validateUpdateUser(req.body);
  if (errors.length > 0)
    return sendError(res, 400, 'Validation failed', errors);

  const updated = db.users.update(id, req.body);
  sendSuccess(res, 200, 'User updated', updated);
}

function deleteUser(req, res, id) {
  const user = db.users.findById(id);
  if (!user) return sendError(res, 404, `User with id ${id} not found`);

  db.users.delete(id);
  sendSuccess(res, 200, `User ${id} deleted`, null);
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };