const jwt = require('jsonwebtoken');

const auth =(req, res, next) => {
 
   const token = req.headers.authorization?.split(" ")[1];
   if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied,Please Login!' });
  }
   else{
    jwt.verify(token,`${process.env.key}`,(err,decoded)=>{
        if(decoded){
            // console.log(decoded);
           
            req.body.userID=decoded.user.userID
            req.body.username=decoded.user.username
            req.body.role= decoded.user.role;
            // console.log(req.body);
            next();
        }else{
            res.send({ msg:"You are not Authorised"})
        }
    });
   }
};


module.exports = {auth};