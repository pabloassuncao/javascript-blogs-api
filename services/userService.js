const jwt = require('jsonwebtoken');

const { User } = require('../models');
const utils = require('../utils/utils');

async function listAll() {
  const result = await User.findAll();
  const resultArray = result.map((user) => user.dataValues);
  return resultArray;
}

async function findById(id) {
  const result = await User.findByPk(id);
  if (!result) {
    const e = new Error();
    e.code = 'NOT_FOUND';
    e.message = utils.MESSAGES.USER_NOT_FOUND;
    throw e;
  }
  return result;
}

async function remove(token) {
  const userId = jwt.verify(token, process.env.JWT_SECRET).id;
  const user = await findById(userId);
  await user.destroy();
}

module.exports = {
  listAll,
  findById,
  remove,
};