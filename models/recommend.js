const mongoose = require('mongoose-q')(require('mongoose'));

const Schema = mongoose.Schema;

const Recommend = new Schema({
  referee: {
    name: String,
    about: String,
    avatar: String,
  }, // 推荐人信息
  picture: String, // 顶部图片url链接
  head: String, // 主标题
  subHead: String, // 副标题
  reason: String, // 推荐理由
  restaurant: [String], // 餐厅信息
  top: Boolean,
});

module.exports = mongoose.model('Recommend', Recommend);
