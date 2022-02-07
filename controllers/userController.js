const { Router } = require('express');
const rescue = require('express-rescue');

const userService = require('../services/userService');
const utils = require('../utils/utils');

async function listAll(__req, res) {
  const result = await userService.listAll();
  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

const router = Router();

module.exports = router
  .get('/', rescue(listAll));
