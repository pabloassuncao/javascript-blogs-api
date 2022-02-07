const userSchema = require('../schemas/userSchema');
const { User } = require('../models');
const utils = require('../utils/utils');
const { generateToken } = require('../utils/token');

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

  await User.create({ displayName, email, password, image });

  const token = generateToken({ displayName, email });

  return token;
}

module.exports = {
  validate,
  create,
};