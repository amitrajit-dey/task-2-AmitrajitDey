function validateCreateUser(body) {
  const errors = [];

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2)
    errors.push('name: required, min 2 characters');

  if (!body.email || typeof body.email !== 'string')
    errors.push('email: required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.push('email: invalid format');

  if (body.role && !['admin', 'intern', 'mentor'].includes(body.role))
    errors.push('role: must be admin, intern, or mentor');

  return errors;
}

function validateUpdateUser(body) {
  const errors = [];

  if (body.name !== undefined) {
    if (typeof body.name !== 'string' || body.name.trim().length < 2)
      errors.push('name: min 2 characters');
  }

  if (body.email !== undefined) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      errors.push('email: invalid format');
  }

  if (body.role !== undefined) {
    if (!['admin', 'intern', 'mentor'].includes(body.role))
      errors.push('role: must be admin, intern, or mentor');
  }

  return errors;
}

function validateCreatePost(body) {
  const errors = [];

  if (!body.userId || isNaN(Number(body.userId)))
    errors.push('userId: required and must be a number');

  if (!body.title || typeof body.title !== 'string' || body.title.trim().length < 3)
    errors.push('title: required, min 3 characters');

  if (!body.content || typeof body.content !== 'string' || body.content.trim().length < 10)
    errors.push('content: required, min 10 characters');

  return errors;
}

module.exports = { validateCreateUser, validateUpdateUser, validateCreatePost };