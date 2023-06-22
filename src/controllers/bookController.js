const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = Book.find();

    res.status(200).json({
      status: 'succes',
      results: books.length,
      data: { books },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail' });
  }
};
