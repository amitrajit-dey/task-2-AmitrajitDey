const db                 = require('../models/db');
const { sendSuccess,
        sendError }      = require('../middleware/response');
const { validateCreatePost } = require('../middleware/validator');

function getAllPosts(req, res) {
  const allPosts = db.posts.findAll();
  sendSuccess(res, 200, `${allPosts.length} posts found`, allPosts);
}

function getPostById(req, res, id) {
  const post = db.posts.findById(id);
  if (!post) return sendError(res, 404, `Post with id ${id} not found`);
  sendSuccess(res, 200, 'Post found', post);
}

function createPost(req, res) {
  const errors = validateCreatePost(req.body);
  if (errors.length > 0)
    return sendError(res, 400, 'Validation failed', errors);

  const user = db.users.findById(req.body.userId);
  if (!user) return sendError(res, 404, `User with id ${req.body.userId} not found`);

  const newPost = db.posts.create({
    userId   : Number(req.body.userId),
    title    : req.body.title.trim(),
    content  : req.body.content.trim(),
    published: req.body.published ?? false,
  });

  sendSuccess(res, 201, 'Post created', newPost);
}

module.exports = { getAllPosts, getPostById, createPost };