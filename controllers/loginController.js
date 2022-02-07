const { Router } = require('express');
const rescue = require('express-rescue');

const loginService = require('../services/loginService');
const utils = require('../utils/utils');

async function validate(req, __res, next) {
  const loginInfo = req.body;
  await loginService.validate(loginInfo);
  return next();
}

async function login(req, res) {
  const loginInfo = req.body;

  const token = await loginService.login(loginInfo);
  return res.status(utils.HTTP_OK_STATUS).json({ token }).end();
}

const router = Router();

module.exports = router
  // .get('/:id', rescue(prod.findProductById))
  // .get('/', rescue(prod.listAllProducts))
  // .put('/:id', rescue(prod.validateProduct), rescue(prod.updateProduct))
  .post('/', rescue(validate), rescue(login));
  // .delete('/:id', rescue(prod.deleteProductById));
