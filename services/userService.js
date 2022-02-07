const { User } = require('../models');

async function listAll() {
  const result = await User.findAll();
  return result;
}

module.exports = {
  listAll,
};