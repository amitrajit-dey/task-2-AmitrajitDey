const COLORS = {
  GET   : '\x1b[32m',  // green
  POST  : '\x1b[34m',  // blue
  PUT   : '\x1b[33m',  // yellow
  DELETE: '\x1b[31m',  // red
  reset : '\x1b[0m',
};

function logger(req) {
  const time   = new Date().toISOString();
  const method = req.method;
  const color  = COLORS[method] || '\x1b[37m';
  console.log(`  ${color}[${method}]${COLORS.reset} ${req.url}  — ${time}`);
}

module.exports = logger;