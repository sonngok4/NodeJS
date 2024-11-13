var express = require('express');
const UserController = require('../controllers/user_controller');
var userRouter = express.Router();

/* GET users listing. */
userRouter.get('/', UserController.index);

module.exports = userRouter;
