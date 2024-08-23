const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {BookM}= require('../models/Book.model');


//post/create
const createbook = async (req, res) => {

  try {
    const book = await BookM.findOne({ isbn: req.body.isbn })
    if (book != null) {
      return res.status(400).json({ error: "Book with same ISBN already found" })
    }
    const newBook = await BookM.create(req.body)
    return res.status(200).json({  msg:'A new book has been Created',book: newBook })
  } catch (err) {
    res.status(400).json({ error: err.message });
    // next()
  }

};


//get
const seebook =async( req ,res)=>{
        
    try {
          const books = await BookM.find({userID:req.body.userID})
    return res.status(200).send({
      books: books.map((book) => ({
        ...book.toJSON(),
        availableQuantity: book.quantity - book.borrowedBy.length,
      })),
    })
  }catch (err) {
   res.status(400).send({ error: err.message });
 }
  


}
//get book by ISBN
const byisbn =async (req, res, next) => {
  //console.log(req.params)
  const {bookIsbn}=req.params
  //console.log(bookIsbn)
  try {
    const book = await BookM.findOne({isbn:bookIsbn})
    // if (book == null) {
    //   return res.status(404).send({ error: "Book not found" })
    // }
    //console.log(book)
    return res.status(200).send({
      book: {
        ...book.toJSON(),
        // ...book,
        availableQuantity: book.quantity - book.borrowedBy.length,
      },
    })
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

//get_book_by_author
const authorgetbook =async( req ,res)=>{
  const {author}=req.params
   console.log(author)
    try { 
        const book = await BookM.findOne({author:author});
           // res.status(200).send({ msg:`book with Id:${author}: ${book}`});
          // console.log(book)
          return res.status(200).send({
            msg:`book with Id:${author}`,
            book: {
              ...book.toJSON(),
              // ...book,
              availableQuantity: book.quantity - book.borrowedBy.length,
            },
          })
        } catch (error) {
          res.status(400).send({ error: error.message });
        }

}


//get_book_by_id
const idgetbook =async( req ,res)=>{
  const {bookID}=req.params
   console.log(bookID)
    try { 
        const book = await BookM.findOne({_id:bookID});
           // res.status(200).send({ msg:`book with Id:${bookID}: ${book}`});
          // console.log(book)
          return res.status(200).send({
            msg:`book with Id:${bookID}`,
            book: {
              ...book.toJSON(),
              // ...book,
              availableQuantity: book.quantity - book.borrowedBy.length,
            },
          })
        } catch (error) {
          res.status(400).send({ error: error.message });
        }

}

//update/patch by id: update option 
const updatebook =async(req ,res)=>{
const {bookID}=req.params
    try { 
        const book = await BookM.findOne({_id:bookID})
        if(req.body.username==="admin"){
       await BookM.findByIdAndUpdate({_id:bookID},req.body)
       res.status(200).send({ msg:`book with Id:${bookID} has been updated`});}
       else{
        res.status(400).send({ msg:`You are not Authorised`});}
       
          } catch (error) {
            res.status(400).send({ error: error.message });
          }

}


//delete
const deletebook =async(req ,res)=>{
    const {bookID}=req.params
        try { 
            const book = await BookM.findOne({_id:bookID})
            if(req.body.username==="admin"){
           await BookM.findByIdAndDelete({_id:bookID})
           res.status(200).send({ msg:`book with Id:${bookID} has been deleted`});}
           else{
            res.status(400).send({ msg:`You are not Authorised`});}
           
              } catch (error) {
                res.status(400).send({ error: error.message });
              }
    
    }

module.exports = {createbook,seebook,authorgetbook,idgetbook,updatebook,deletebook,byisbn};