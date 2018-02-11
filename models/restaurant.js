const mongoose = require('mongoose-q')(require('mongoose'));

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String, required: true },
  price: { type: Number, required: true },
  pictures: [String],
  topic: String,
  reason: { type: String, required: true },
  tips: String,
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
  address: { type: String, required: true },
  lng_lat: { type: String, required: true },
  business_hours: [{ type: String, required: true }],
  contact: { type: String, required: true },
  status: { type: Number, default: 1 },
}, {
  timestamps: true,
});

const commentSchema = new Schema({
  openId: String,
  userName: String,
  avatar: String,
  contents: String,
  likes: [String],
  nominate: [String],
});
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
const Comments = mongoose.model('Comment', commentSchema);
module.exports = {
  Restaurant,
  Comments,
};
