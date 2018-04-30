const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  permission: { type: Number, required: true, default: 10 },
  password: { type: String, required: true },
  disable: { type: Boolean },
}, {
  timestamps: true,
});

module.exports = mongoose.model('user', User);
