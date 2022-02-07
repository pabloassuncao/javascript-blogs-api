const { User } = require('../models');
const utils = require('../utils/utils');

async function listAll() {
  const result = await User.findAll();
  return result;
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

module.exports = {
  listAll,
  findById,
};