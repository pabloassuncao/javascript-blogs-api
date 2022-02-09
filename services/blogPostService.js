const jwt = require('jsonwebtoken');
const blogPostSchema = require('../schemas/blogPostSchema');
const { BlogPost, User, Category } = require('../models');

const utils = require('../utils/utils');

const categoryService = require('./categoryService');

async function create({ title, content, categoryIds }, token) {
  const userId = jwt.verify(token, process.env.JWT_SECRET).id;

  const categoriesChecker = categoryIds.map(async (categoryId) => {
    await categoryService.findById(categoryId);
  });

  await Promise.all(categoriesChecker);

  const blogPost = await BlogPost.create({ title, userId, content, categoryIds });
  return blogPost.dataValues;
}

async function listAll() {
  return BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
}

async function findById(id) {
  const result = await BlogPost.findByPk(id, { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!result) {
    const e = new Error();
    e.code = 'NOT_FOUND';
    e.message = utils.MESSAGES.BLOG_POST_NOT_FOUND;
    throw e;
  }

  return result;
}

async function validate(blogPostInfo) {
  const { error } = await blogPostSchema.validate(blogPostInfo);
  
  if (error) {
    const e = new Error();
    e.code = error.details[0].type;
    e.message = error.details[0].message;
    throw e;
  }

  return blogPostInfo;
}

async function userIsCreatorVerifier(id, token) {
  const userId = jwt.verify(token, process.env.JWT_SECRET).id;
  const blogPost = await findById(id);

  if (blogPost.dataValues.userId !== userId) {
    const e = new Error();
    e.code = 'UNAUTHORIZED';
    e.message = utils.MESSAGES.UNAUTHORIZED_USER;
    throw e;
  }
}

async function updateValidate(id, updateInfo, token) {
  await userIsCreatorVerifier(id, token);
  
  if (updateInfo.categoryIds) {
    const e = new Error();
    e.code = 'BAD_REQUEST';
    e.message = utils.MESSAGES.CATEGORY_IDS_NOT_ALLOWED;
    throw e;
  }

  const teste = updateInfo;

  teste.categoryIds = ['array temporário para teste no joi'];
  await validate(teste);
}

async function update(id, updateInfo, token) {
  await updateValidate(id, updateInfo, token);

  const blogPost = await findById(id);

  await blogPost.update(updateInfo);

  return blogPost;
}

module.exports = {
  validate,
  create,
  listAll,
  findById,
  update,
};