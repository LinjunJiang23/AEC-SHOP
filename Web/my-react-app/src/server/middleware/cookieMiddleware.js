// src/server/middleware/cookieMiddleware.js
const cookieParser = require('cookie-parser');

const cookieMiddleware = (req, res, next) => {
  cookieParser()(req, res, () => {
	next();
  });
};

module.exports = cookieMiddleware;