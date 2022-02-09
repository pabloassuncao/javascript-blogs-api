const { Router } = require('express');
const rescue = require('express-rescue');

const userService = require('../services/userService');
const utils = require('../utils/utils');

async function listAll(__req, res) {
  const result = await userService.listAll();
  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function findById(req, res) {
  const { id } = req.params;
  const result = await userService.findById(+id);
  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function remove(req, res) {
  const token = req.headers.authorization;

  await userService.remove(token);
  return res.status(utils.HTTP_OK_NO_CONTENT_STATUS).json().end();
}

const router = Router();

module.exports = router
  .get('/:id', rescue(findById))
  .get('/', rescue(listAll))
  .delete('/me', rescue(remove));
