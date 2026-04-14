const loggerMiddleware = (req, res, next) => {
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log('Request Body:', req.body);
  next();
};

module.exports = loggerMiddleware;