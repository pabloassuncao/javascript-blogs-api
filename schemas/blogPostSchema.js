const joi = require('joi');
const utils = require('../utils/utils');

const BlogPost = joi.object().keys({
  title: joi.string().required().messages({
    'string.base': utils.MESSAGES.TITLE_NOT_STRING,
    'any.required': utils.MESSAGES.TITLE_NOT_FOUND,
  }),
  content: joi.string().required().messages({
    'string.base': utils.MESSAGES.CONTENT_NOT_STRING,
    'any.required': utils.MESSAGES.CONTENT_NOT_FOUND,
  }),
  categoryIds: joi.array().required().messages({
    'any.required': utils.MESSAGES.CATEGORY_IDS_NOT_FOUND,
  }),
});

module.exports = BlogPost;