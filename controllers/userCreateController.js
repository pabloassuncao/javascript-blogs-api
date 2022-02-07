const { Router } = require('express');
const rescue = require('express-rescue');

const userService = require('../services/userCreateService');
const utils = require('../utils/utils');

async function validate(req, __res, next) {
  const userInfo = req.body;
  await userService.validate(userInfo);
  return next();
}

async function create(req, res) {
  const userInfo = req.body;

  const token = await userService.create(userInfo);
  return res.status(utils.HTTP_CREATED_STATUS).json({ token }).end();
}

const router = Router();

module.exports = router
  .post('/', rescue(validate), rescue(create));
