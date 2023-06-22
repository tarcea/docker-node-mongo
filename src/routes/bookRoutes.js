const express = require('express');
const {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

const router = express.Router();

router.route('/').get(getAllBooks).post(createBook);
router.route('/:id').get(getOneBook).patch(updateBook).delete(deleteBook);

module.exports = router;
