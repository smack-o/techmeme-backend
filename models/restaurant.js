const mongoose = require('mongoose-q')(require('mongoose'));

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: String,
  name_en: String,
  price: Number,
  pictures: [String],
  topic: String,
  reason: String,
  tips: String,
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
  address: String,
  lng_lat: String,
  business_hours: [String],
  contact: String,
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
