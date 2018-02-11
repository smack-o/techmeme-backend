const Topic = require('../models/topic');
const Restaurant = require('../models/restaurant').Restaurant;
// const Comments = require('../models/restaurant').Comments;
const { restaurantImageUrl } = require('../utils');

// 获取单个餐厅信息
async function addTopic(req) {
  const { name, status } = req.body;

  if (!name) {
    return Promise.resolve({
      error: true,
      msg: '主题名字不能为空',
    });
  }
  const topic = new Topic({
    name,
    status,
  });
  return topic.save().then(() => Promise.resolve({
    msg: '主题添加成功',
  })).catch(e => Promise.resolve({
    error: e.message || e,
    msg: '主题添加失败',
  }));
}

async function updateTopic(req) {
  const id = req.params.id;
  const { name, status } = req.body;
  const topics = await Topic.findByIdAndUpdateQ(id, {
    name,
    status,
  });
  return topics;
}

async function getTopicList() {
  const topics = await Topic.find();
  return topics;
}


async function getTopicArticles(req) {
  const id = req.params.id;
  const restaurant = await Restaurant
    .findOne({ topic: id })
    .populate('comments')
    .then(rest => Promise.resolve(restaurantImageUrl(rest._doc)))
    .catch(err => Promise.resolve({
      error: err.message,
    }));
  return restaurant;
}

async function deleteTopic(req) {
  const id = req.params.id;
  const result = await Topic.findByIdAndRemoveQ(id);
  return result;
}


module.exports = {
  addTopic,
  updateTopic,
  getTopicList,
  getTopicArticles,
  deleteTopic,
};
