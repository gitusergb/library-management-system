const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel}= require('../models/User.model');
const {BookM}= require('../models/Book.model'); 

const omitPassword = (user) => {
  const { password, ...rest } = user
  return rest
}


//post
const registerUser = async (req, res) => {
    const {username,email,password,role}=req.body
 
  try { 

 bcrypt.hash(password,5,async(err,hash)=>{
    if(err){
            res.status(200).send({"error":err})
    }else{
        const user=new UserModel({username,email,password:hash,role: role || 'user',})
        await user.save()
        res.status(200).json({ msg: 'The new user has been registered',registeredUser:user});
    }
 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async(req, res) => {
    const {email, password} = req.body;
  try {
   
    const user = await UserModel.findOne({email});
    bcrypt.compare(password,user.password,(err, result)=>{
     if(result){
      const payload = { user:{ userID:user._id,username:user.username,role:user.role} };
        const token = jwt.sign(payload,process.env.key,{ expiresIn: '1h' });
        res.status(200).send({ msg:'Login successful!', "token" : token });
     }else{
        res.status(400).send({ error:'Invalid email or password' });
     }
    })
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


// GET /users/logout
const logoutUser = async (req, res) => {
  // req.session.destroy()
  const token = req.headers.authorization?.split(" ")[1];
  try {
    res.status(200).json({ msg: 'User has been logged out' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




////////////////////////////////////////////////////////
//getuser
const getUser= async (req, res, next) => {
  try {
    const users = await UserModel.find({})
//return res.status(200).json({ users: users.map((user) => omitPassword(user.toJSON())) })
if(req.body.username==="admin"){
   res.status(200).send({ users: users.map((user) => omitPassword(user.toJSON())) })
}  else{
  res.status(400).send({ msg:`You are not Authorised`});}
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


const borrowbook= async (req, res, next) => {
  try {
    const book = await BookM.findOne({ isbn: req.body.isbn })
    if (book == null) {
      return res.status(404).json({ error: "Book not found" })
    }
    if (book.borrowedBy.length === book.quantity) {
      return res.status(400).json({ error: "Book is not available" })
    }
    const user = await UserModel.findById(req.body.userId)
    if (user == null) {
      return res.status(404).json({ error: "User not found" })
    }
    if (book.borrowedBy.includes(user.id)) {
      return res.status(400).json({ error: "You've already borrowed this book" })
    }
    await book.update({ borrowedBy: [...book.borrowedBy, user.id] })
    const updatedBook = await BookM.findById(book.id)
    return res.status(200).json({
      book: {
        ...updatedBook.toJSON(),
        availableQuantity: updatedBook.quantity - updatedBook.borrowedBy.length,
      },
    })
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const returnb= async (req, res, next) => {
  try {
    const book = await BookM.findOne({ isbn: req.body.isbn })
    if (book == null) {
      return res.status(404).json({ error: "Book not found" })
    }
    const user = await UserModel.findById(req.body.userId)
    if (user == null) {
      return res.status(404).json({ error: "User not found" })
    }
    if (!book.borrowedBy.includes(user.id)) {
      return res.status(400).json({ error: "You need to borrow this book first!" })
    }
    console.log("user.id", user.id)
    console.log("book.borrowedBy", book.borrowedBy)
    console.log(
      "filtered",
      book.borrowedBy.filter((borrowedBy) => !borrowedBy.equals(user.id))
    )
    await book.update({
      borrowedBy: book.borrowedBy.filter((borrowedBy) => !borrowedBy.equals(user.id)),
    })
    const updatedBook = await BookM.findById(book.id)
    return res.status(200).json({
      book: {
        ...updatedBook.toJSON(),
        availableQuantity: updatedBook.quantity - updatedBook.borrowedBy.length,
      },
    })
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

 const borrow_books=async (req, res, next) => {
  try {
    const result = await BookM.find({ "borrowedBy": { "$in": req.session.userId } })
    return res.status(200).json({ books: result })
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const getProfile= async (req, res, next) => {
  const {userID}=req.body
  console.log(userID)
  try {
        const user = await UserModel.findOne({_id:userID})
    if (user == null) {
      return res.status(404).json({ error: "User not found" })
    }
    return res.status(200).json({ user: omitPassword(user.toJSON()) })
  
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

////////////////////////////////////////////////////////

module.exports = {getUser,registerUser,loginUser, logoutUser,borrowbook ,getProfile,borrow_books,returnb};
