const config = require('../config/config');

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin',  config.ALLOWED_ORIGINS.join(','));
  res.setHeader('Access-Control-Allow-Methods', config.ALLOWED_METHODS.join(','));
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

module.exports = setCors;