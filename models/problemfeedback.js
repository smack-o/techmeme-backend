const mongoose = require('mongoose-q')(require('mongoose'));

const Schema = mongoose.Schema;

const ProblemFeedbackSchema = new Schema({
  openId: String,
  content: String,
  status: String,
});

module.exports = mongoose.model('ProblemFeedback', ProblemFeedbackSchema);
