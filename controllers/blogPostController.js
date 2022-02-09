const { Router } = require('express');
const rescue = require('express-rescue');

const blogPostService = require('../services/blogPostService');
const utils = require('../utils/utils');

async function validate(req, __res, next) {
  console.log('update');

  const blogPostInfo = req.body;
  await blogPostService.validate(blogPostInfo);
  return next();
}

async function create(req, res) {
  const blogPostInfo = req.body;
  const token = req.headers.authorization;

  const result = await blogPostService.create(blogPostInfo, token);
  return res.status(utils.HTTP_CREATED_STATUS).json(result).end();
}

async function listAll(__req, res) {
  const result = await blogPostService.listAll();
  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function findById(req, res) {
  const { id } = req.params;
  const result = await blogPostService.findById(id);

  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function update(req, res) {
  console.log('update');
  const { id } = req.params;
  const blogPostInfo = req.body;
  const token = req.headers.authorization;

  const result = await blogPostService.update(id, blogPostInfo, token);
  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

const router = Router();

module.exports = router
  .put('/:id', rescue(update))
  .post('/', rescue(validate), rescue(create))
  .get('/:id', rescue(findById))
  .get('/', rescue(listAll));
