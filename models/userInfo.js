const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
  openId: String,
  name: String,
  avatar: String,
  about: String,
  social: String,
  collect: [String],
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);
// const UserInfo = mongoose.model('UserInfo', UserInfoSchema);
// exports.UserInfo = UserInfo;
