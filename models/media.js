const mongoose = require('mongoose-q')(require('mongoose'));

const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  path: { type: String, required: true },
}, {
  timestamps: true,
});

const Media = mongoose.model('Media', MediaSchema);

module.exports = {
  Media,
};
