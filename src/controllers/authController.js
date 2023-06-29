const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      password: hashpassword,
    });

    user.password = undefined;
    req.session.user = user;

    res.status(201).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'user not found' });
    }

    const isCorrectPassword = bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'incorrect credentials' });
    }

    user.password = undefined;

    req.session.user = user;

    res.status(201).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail' });
  }
};
