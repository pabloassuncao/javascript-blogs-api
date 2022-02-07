const argon2 = require('argon2');

function encryptPassword(password) {
  return argon2.hash(password, { type: argon2.argon2id });
}

function checkPassword(password, hash) {
  return argon2.verify(hash, password);
}

module.exports = {
  encryptPassword,
  checkPassword,
};