const FeedBack = require('../models/problemfeedback');
// 增加回馈信息
async function addfeedback(req) {
  const feedback = new FeedBack(req.body);
  await feedback.save();
  return {
    status: 200,
    msg: '回馈信息保存成功',
  };
}
// 删除回馈信息
async function deleteFeedBack(req) {
  const id = req.params.id ? req.params.id : null;
  let result = {};
  if (!id) {
    result = {
      status: 404,
      msg: '请输入正确的id',
    };
  }
  await FeedBack.findByIdAndRemoveQ(id)
  .then(() => {
    result = {
      status: 200,
      msg: '反馈信息删除成功',
    };
  });
  return result;
}
// 更新反馈信息
async function updateFeedBack(req) {
  const id = req.params.id ? req.params.id : null;
  console.warn(req.body);
  let result = {};
  if (!id) {
    result = {
      status: 404,
      msg: '请输入正确的用户id',
    };
  }
  await FeedBack.findByIdQ(id)
  .then((feedback) => {
    console.warn(feedback);
    feedback.update(req.body).exec();
  });
  result = {
    status: 200,
    msg: '反馈信息更新成功',
  };
  return result;
}
// 获取所有反馈信息
async function getAllFeedBack() {
  let results = {};
  await FeedBack.find().exec((err, feedbacks) => {
    results = feedbacks;
  });
  return results;
}
// 获取一定状态的反馈信息
async function getStatusFeedBack(req) {
  let results = {};
  await FeedBack.find({ status: req.query.status }).exec((err, feedbacks) => {
    results = feedbacks;
  });
  return results;
}
// 获取单个反馈信息详情
async function getFeedBack(req) {
  const id = req.params.id;
  let results = {};
  await FeedBack.findOne({ _id: id }).exec((err, feedback) => {
    results = feedback;
  });
  return results;
}
// 获取某个用户所有的反馈信息
async function getFeedBackByOpenId(req) {
  const id = req.params.openId;
  let results = {};
  await FeedBack.find({ openId: id }).exec((err, feedback) => {
    results = feedback;
  });
  return results;
}
module.exports = {
  addfeedback,
  deleteFeedBack,
  updateFeedBack,
  getAllFeedBack,
  getFeedBack,
  getFeedBackByOpenId,
  getStatusFeedBack,
};
