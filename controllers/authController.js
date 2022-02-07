const jwt = require('jsonwebtoken');
const utils = require('../utils/utils');

async function authController(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: utils.MESSAGES.TOKEN_NOT_FOUND }).end();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: utils.MESSAGES.TOKEN_INVALID });
  }
}

module.exports = authController;
