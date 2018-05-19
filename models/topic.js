// 主题（标签）
const mongoose = require('mongoose-q')(require('mongoose'));

const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: { type: String, required: true },
  status: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;
