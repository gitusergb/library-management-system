const express = require('express');
const { getUser,registerUser,loginUser,logoutUser,borrowbook,getProfile,borrow_books,returnb} = require('../controllers/userController');
 const {auth} = require('../Middleware/auth.middleware');
 const {role} = require('../middleware/role.middleware');
const userRouter = express.Router();



userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', auth,logoutUser);
//////////////////////////////////////////
userRouter.get('/',auth,role(['admin']),getUser);

userRouter.post("/borrow",auth,borrowbook);
userRouter.get("/profile",auth,getProfile)
userRouter.get("/borrowed-books",auth,borrow_books);
userRouter.post("/return",returnb);
/////////////////////////////////////////


module.exports = {userRouter};
