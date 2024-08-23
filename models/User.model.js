const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  username: { type:String,required:true},
  email: { type:String,required:true , unique: true },
  password: { type:String,required:true,min:5},
  role: { type: String,enum:['admin','user','author'],default: 'user'},
  borrowedBooks: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      dueDate: { type: Date },
      returned: { type: Boolean, default: false },
    },
  ],
  maxBorrowLimit: { type: Number, default: 5 },
 
},{
    versionKey:false,
    timestamps:true
});

const UserModel = mongoose.model('User', userSchema);
module.exports = {UserModel};

