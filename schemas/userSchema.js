const joi = require('joi');
const utils = require('../utils/utils');

const userSchema = joi.object().keys({
  displayName: joi.string().min(8).required().messages({
    'string.base': utils.MESSAGES.DS_NAME_NOT_STRING,
    'string.min': utils.MESSAGES.DS_NAME_INVALID,
    'any.required': utils.MESSAGES.DS_NAME_NOT_FOUND,
  }),
  email: joi.string().required().email().messages({
    'string.base': utils.MESSAGES.EMAIL_NOT_STRING,
    'string.email': utils.MESSAGES.EMAIL_INVALID,
    'any.required': utils.MESSAGES.EMAIL_NOT_FOUND,
  }),
  password: joi.string().min(6).required().messages({
    'string.base': utils.MESSAGES.PASSWORD_NOT_STRING,
    'string.min': utils.MESSAGES.PASSWORD_INVALID,
    'any.required': utils.MESSAGES.PASSWORD_NOT_FOUND,
  }),
  image: joi.string(),
});

module.exports = userSchema;