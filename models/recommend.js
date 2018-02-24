const mongoose = require('mongoose-q')(require('mongoose'));

const Schema = mongoose.Schema;

const Recommend = new Schema({
  referee: {
    name: String,
    about: String,
    avatar: String,
  }, // 推荐人信息
  picture: { type: String, required: true }, // 顶部图片url链接
  title: { type: String, required: true }, // 主标题
  subTitle: { type: String, required: true }, // 副标题
  reason: { type: String, required: true }, // 推荐理由
  restaurant: [{
    id: String,
    reason: String,
  }], // 餐厅信息
  top: { type: Boolean, default: false },
  status: { type: Number, default: 0 },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Recommend', Recommend);
