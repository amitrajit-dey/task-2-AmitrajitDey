const config = {
  PORT           : process.env.PORT     || 3000,
  NODE_ENV       : process.env.NODE_ENV || 'development',
  API_PREFIX     : '/api',
  ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  ALLOWED_ORIGINS: ['*'],
};

module.exports = config;