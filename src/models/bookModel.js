const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Book must have title'],
  },
  author: {
    type: String,
    required: [true, 'Book must have author'],
  },
});

const Book = model('Book', bookSchema);
module.exports = Book;
