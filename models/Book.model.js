
const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, ref: 'Author', required: true },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  publishedDate: { type: Date },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  borrowedBy: [{ type: String, ref: "users" }],
  priceHistory: { type: Array, required: true, default: [] },
  quantityHistory: { type: Array, required: true, default: [] },

},
{
  versionKey:false,
  timestamps:true
});

const BookM = mongoose.model('Book', bookSchema);

module.exports = {BookM};




