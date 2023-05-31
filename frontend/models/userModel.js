const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userID: String,
  name: String,
  email: String,
  salt: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);