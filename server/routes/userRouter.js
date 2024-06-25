const express = require('express');
const { 
    insertUser, 
    deleteAccount, 
    loginUser, 
    updateUserPassword,
    getAllUsers,
    blockUser,
    unBlockUser
} = require('../controllers/userController');
const userRouter = express.Router();


userRouter.post('/insertUser', insertUser);
userRouter.post('/loginUser', loginUser);
userRouter.delete('/deleteAccount', deleteAccount);
userRouter.post('/updateUserPassword', updateUserPassword);
userRouter.get('/getAllUsers', getAllUsers);
userRouter.put('/blockUser', blockUser);
userRouter.put('/unBlockUser', unBlockUser);

module.exports = userRouter;