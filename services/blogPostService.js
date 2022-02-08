const jwt = require('jsonwebtoken');
const blogPostSchema = require('../schemas/blogPostSchema');
const { BlogPost, User, Category } = require('../models');

const utils = require('../utils/utils');

const categoryService = require('./categoryService');

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

module.exports = {
  validate,
  create,
  listAll,
  findById,
};