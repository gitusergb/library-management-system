const express = require('express');
const {createbook,seebook,authorgetbook,idgetbook,updatebook,deletebook,byisbn} = require('../controllers/bookController');
const {auth} = require('../middleware/auth.middleware');
const {role} = require('../middleware/role.middleware');

const bookRouter= express.Router();
//restricted
// bookRouter.post('/addbook',auth,role(['admin','author']), createbook);
bookRouter.post('/addbook',createbook);
bookRouter.get('/',seebook);
bookRouter.get(`/:bookIsbn`,auth,role(['admin','author']),byisbn);//get by ISBN
bookRouter.get('/:author',authorgetbook);
bookRouter.get('/:bookID',auth,role(['admin','author']),idgetbook);//get by ID
bookRouter.patch('/update/:bookID',auth,role(['admin','author']),updatebook);
// bookRouter.delete('/delete/:bookID',auth,role(['admin','author']),deletebook);
bookRouter.delete('/delete/:bookID',deletebook);
/////////////////////////GB////////////////////////////

module.exports = {bookRouter};