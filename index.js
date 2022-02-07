require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const utils = require('./utils/utils');
const loginController = require('./controllers/loginController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(utils.USER_ROUTE, userController);

app.use(utils.LOGIN_ROUTE, loginController);

app.use((err, __req, res, __next) => {
  const status = utils.ERR_CODES[err.code];
  console.log(err);

  if (status) {
    return res.status(status).json({ message: err.message }).end();
  }
  
  return res
    .status(utils.HTTP_INTERNAL_SERVER_ERROR_STATUS)
    .json({ message: 'Internal server error' }).end();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
