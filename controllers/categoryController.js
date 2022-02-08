const { Router } = require('express');
const rescue = require('express-rescue');

const categoryService = require('../services/categoryService');
const utils = require('../utils/utils');

async function validate(req, __res, next) {
  const { name } = req.body;
  await categoryService.validate(name);
  return next();
}

async function create(req, res) {
  const { name } = req.body;
  console.log(name, 'controllers/categoryController.js');
  const result = await categoryService.create(name);
  return res.status(utils.HTTP_CREATED_STATUS).json(result).end();
}

async function listAll(__req, res) {
  const result = await categoryService.listAll();
  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

const router = Router();

module.exports = router
  .post('/', rescue(validate), rescue(create))
  .get('/', rescue(listAll));
