const { argon2id } = require('argon2');
const jwt = require('jsonwebtoken');
const utils = require('../utils/utils');
const loginSchema = require('../schemas/loginSchema');
const { User } = require('../models');

async function validate(loginInfo) {
  const { error } = await loginSchema.validate(loginInfo);
  
  if (error) {
    const e = new Error();
    e.code = error.details[0].type;
    e.message = error.details[0].message;
    throw e;
  }

  return loginInfo;
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const e = new Error();
    e.message = utils.MESSAGES.USER_NOT_EXISTS;
    e.code = 'BAD_REQUEST';
    throw e;
  }

  if (user.password.includes('argon2') && !argon2id.verify(user.password, password)) {
    const e = new Error();
    e.message = utils.MESSAGES.CREDENTIALS_INVALID;
    e.code = 'BAD_REQUEST';
    throw e;
  }

  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
}

module.exports = {
  validate,
  login,
};