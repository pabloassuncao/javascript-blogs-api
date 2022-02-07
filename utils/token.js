const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, jwtConfig);
}

function validateToken(token) {
  return jwt.verify(token, JWT_SECRET, jwtConfig);
}

module.exports = {
  generateToken,
  validateToken,
};
