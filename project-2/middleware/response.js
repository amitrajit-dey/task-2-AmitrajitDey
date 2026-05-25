function sendSuccess(res, statusCode = 200, message = 'Success', data = null) {
  const body = JSON.stringify({
    success  : true,
    status   : statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
  res.writeHead(statusCode, {
    'Content-Type'  : 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function sendError(res, statusCode = 500, message = 'Internal Server Error', errors = null) {
  const body = JSON.stringify({
    success  : false,
    status   : statusCode,
    message,
    errors,
    timestamp: new Date().toISOString(),
  });
  res.writeHead(statusCode, {
    'Content-Type'  : 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

module.exports = { sendSuccess, sendError };