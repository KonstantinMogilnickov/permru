const express = require('express');
const { insertUser, deleteAccount, loginUser } = require('../controllers/userController');
const userRouter = express.Router();


userRouter.post('/insertUser', insertUser);
userRouter.post('/loginUser', loginUser);
userRouter.delete('/deleteAccount', deleteAccount);

module.exports = userRouter;