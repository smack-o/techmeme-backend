const Topic = require('../models/topic');
const Restaurant = require('../models/restaurant').Restaurant;
// const Comments = require('../models/restaurant').Comments;
const { handleRestaurant } = require('../utils');

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
  let topics = await Topic.find();
  const promiseList = topics.map(async (item) => {
    const promise = await Restaurant.find({
      topic: item._id,
    }).count();
    return promise;
  });
  return Promise.all(promiseList).then((values) => {
    topics = topics.map((item, index) => ({
      ...item._doc,
      articlesCount: values[index],
    }));
    return Promise.resolve(topics);
  });
}


async function getTopicArticles(req) {
  const id = req.params.id;
  const restaurant = await Restaurant
    .findOne({ topic: id })
    .populate('comments')
    .then(rest => Promise.resolve(handleRestaurant(rest._doc)))
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

async function getTopicHomeList() {
  let topics = await Topic.find({ status: 1 });
  const promiseList = topics.map(async (item) => {
    const promise = await Restaurant
      .find({
        topic: item._id,
        status: 1,
      })
      .limit(5)
      .sort({ _id: -1 });
    return promise;
  });
  return Promise.all(promiseList).then((values) => {
    topics = topics.map((item, index) => ({
      ...item._doc,
      articles: values[index],
    }));
    return Promise.resolve(topics);
  });
}

module.exports = {
  addTopic,
  updateTopic,
  getTopicList,
  getTopicArticles,
  deleteTopic,
  getTopicHomeList,
};
