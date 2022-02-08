const { Category } = require('../models');
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
  const categoryCheck = await Category.findOne({ where: { name } });

  if (categoryCheck) {
    const e = new Error();
    e.message = utils.MESSAGES.CATEGORY_ALREADY_EXISTS;
    e.code = 'CONFLICT';
    throw e;
  }

  const newCategory = await Category.create({ name });

  return newCategory.dataValues;
}

async function listAll() {
  const result = await Category.findAll({ order: [['id', 'ASC']] });
  const resultArray = result.map((category) => category.dataValues);
  console.log(resultArray, 'listAll');
  return resultArray;
}

async function findById(id) {
  let result = await Category.findByPk(id);
  result = result.dataValues;
  if (!result) {
    const e = new Error();
    e.code = 'NOT_FOUND';
    e.message = utils.MESSAGES.CATEGORY_NOT_FOUND;
    throw e;
  }
  return result;
}

module.exports = {
  validate,
  create,
  listAll,
  findById,
};