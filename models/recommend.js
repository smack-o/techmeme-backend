// 编辑推荐 城市攻略
const mongoose = require('mongoose-q')(require('mongoose'));

const Schema = mongoose.Schema;

const Recommend = new Schema({
  editor: { type: Number, default: 0 }, // 1为编辑推荐 0为达人推荐
  referee: {
    name: String,
    about: String,
    avatar: String,
  }, // 推荐人信息
  pictures: [{ type: String, required: true }], // 顶部图片url链接
  title: { type: String, required: true }, // 主标题
  subtitle: { type: String, required: true }, // 副标题
  reason: { type: String, required: true }, // 推荐理由
  articles: [{
    id: String,
    reason: String,
  }], // 餐厅信息
  top: { type: Number, default: 0 }, // 是否置顶
  status: { type: Number, default: 0 }, // 是否下架
}, {
  timestamps: true,
});

module.exports = mongoose.model('Recommend', Recommend);
