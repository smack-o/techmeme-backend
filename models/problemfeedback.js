const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProblemFeedbackSchema = new Schema({

});

const ProblemFeedback = mongoose.model('ProblemFeedback', ProblemFeedbackSchema);
exports.ProblemFeedback = ProblemFeedback;
