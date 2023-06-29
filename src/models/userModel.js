const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'User must have username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User must have password'],
  },
});

const User = model('User', userSchema);
module.exports = User;
