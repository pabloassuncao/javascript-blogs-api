const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');
const { User } = require('../models');
const utils = require('../utils/utils');

async function validate(userInfo) {
  const { error } = await userSchema.validate(userInfo);
  
  if (error) {
    const e = new Error();
    e.code = error.details[0].type;
    e.message = error.details[0].message;
    throw e;
  }

  return userInfo;
}

async function create({ displayName, email, password, image }) {
  const userCheck = await User.findOne({ where: { email } });

  if (userCheck) {
    const e = new Error();
    e.message = utils.MESSAGES.USER_ALREADY_EXISTS;
    e.code = 'CONFLICT';
    throw e;
  }

  const pass = await argon2.hash(password, { type: argon2.argon2id });

  const result = await User.create({ displayName, email, password: pass, image });

  return jwt
    .sign(result.dataValues, process.env.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
}

module.exports = {
  validate,
  create,
};