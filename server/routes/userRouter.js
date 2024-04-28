const express = require('express');
const { insertUser, deleteAccount, loginUser, updateUserPassword } = require('../controllers/userController');
const userRouter = express.Router();


userRouter.post('/insertUser', insertUser);
userRouter.post('/loginUser', loginUser);
userRouter.delete('/deleteAccount', deleteAccount);
userRouter.post('/updateUserPassword', updateUserPassword);

module.exports = userRouter;