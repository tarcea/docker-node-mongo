const express = require('express');
const { signUp, login } = require('../controllers/authController');
const checkUser = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.get('/dashboard', checkUser, (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ status: 'fail', message: 'unauthorized' });
  }

  res
    .status(200)
    .json({ status: 'success', data: { userName: user.username } });
});

module.exports = router;
