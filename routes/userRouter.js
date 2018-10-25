const userRouter = require('express').Router();
const { sendAllUsers, sendByName } = require('../controllers/userController');

userRouter.get('/', sendAllUsers);
userRouter.get('/:username', sendByName);

module.exports = userRouter;