const express = require('express');
const {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const checkUser = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(checkUser, getAllBooks).post(checkUser, createBook);
router.route('/:id').get(getOneBook).patch(updateBook).delete(deleteBook);

module.exports = router;
