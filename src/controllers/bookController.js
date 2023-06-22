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

exports.getOneBook = async (req, res, next) => {
  try {
    const book = Book.findById(req.params.id);

    res.status(200).json({
      status: 'succes',
      data: { book },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail' });
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const book = Book.create(req.body);

    res.status(201).json({
      status: 'succes',
      data: { book },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail' });
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'succes',
      data: { book },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail' });
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'succes',
    });
  } catch (err) {
    res.status(400).json({ status: 'fail' });
  }
};
