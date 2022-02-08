const { Categories } = require('../models');
const utils = require('../utils/utils');

async function validate(name) {
  console.log(name, 'testesssssdasdasdas');
  if (!name) {
    const e = new Error();
    e.code = 'BAD_REQUEST';
    e.message = utils.MESSAGES.CATEGORY_NAME_NOT_FOUND;
    throw e;
  }

  return name;
}

async function create(name) {
  const categoryCheck = await Categories.findOne({ where: { name } });

  if (categoryCheck) {
    const e = new Error();
    e.message = utils.MESSAGES.CATEGORY_ALREADY_EXISTS;
    e.code = 'CONFLICT';
    throw e;
  }

  const newCategory = await Categories.create({ name });

  return newCategory.dataValues;
}

async function listAll() {
  const result = await Categories.findAll({ order: [['id', 'ASC']] });
  const resultArray = result.map((category) => category.dataValues);
  console.log(resultArray, 'listAll');
  return resultArray;
}

module.exports = {
  validate,
  create,
  listAll,
};