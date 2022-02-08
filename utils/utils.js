// Messages
const MESSAGES = {
  DS_NAME_INVALID: '"displayName" length must be at least 8 characters long',
  DS_NAME_NOT_STRING: '"displayName" should be a string',
  DS_NAME_NOT_FOUND: '"displayName" is required',
  EMAIL_INVALID: '"email" must be a valid email',
  EMAIL_NOT_FOUND: '"email" is required',
  EMAIL_NOT_STRING: '"email" should be a string',
  EMAIL_EMPTY: '"email" is not allowed to be empty',
  PASSWORD_INVALID: '"password" length must be 6 characters long',
  PASSWORD_NOT_FOUND: '"password" is required',
  PASSWORD_NOT_STRING: '"password" should be a string',
  PASSWORD_EMPTY: '"password" is not allowed to be empty',
  USER_ALREADY_EXISTS: 'User already registered',
  USER_NOT_EXISTS: 'Invalid fields',
  USER_NOT_FOUND: 'User does not exist',
  CREDENTIALS_INVALID: 'Invalid credentials',
  TOKEN_NOT_FOUND: 'Token not found',
  TOKEN_INVALID: 'Expired or invalid token',
  CATEGORY_NAME_NOT_FOUND: '"name" is required',
  CATEGORY_ALREADY_EXISTS: 'User already registered',
};

// HTTP response status codes
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_OK_NO_CONTENT_STATUS = 204;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_CONFLICT_STATUS = 409;
const HTTP_UNPROCCESSABLE_ENTITY_STATUS = 422;
const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

// Errors code
const ERR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCCESSABLE_ENTITY: 422,
  'string.base': 400,
  'string.min': 400,
  'string.email': 400,
  'string.empty': 400,
  'any.required': 400,
  'number.min': 400,
  'number.base': 400,
};

// Routes
const USER_ROUTE = '/user';
const LOGIN_ROUTE = '/login';
const CATEGORY_ROUTE = '/categories';

// Port
const PORT = '3000';

// Functions

// Export

module.exports = {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_OK_NO_CONTENT_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNAUTHORIZED_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CONFLICT_STATUS,
  HTTP_UNPROCCESSABLE_ENTITY_STATUS,
  HTTP_INTERNAL_SERVER_ERROR_STATUS,
  USER_ROUTE,
  LOGIN_ROUTE,
  CATEGORY_ROUTE,
  PORT,
  ERR_CODES,
  MESSAGES,
};