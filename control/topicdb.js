const Topic = require('../models/topic');
const Restaurant = require('../models/restaurant').Restaurant;
// const Comments = require('../models/restaurant').Comments;
const { handleRestaurant } = require('../utils');

// 添加主题
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

// 更新主题
async function updateTopic(req) {
  const id = req.params.id;
  // const { name, status } = req.body;
  return Topic.findByIdAndUpdateQ(id, req.body);
}

// 获取主题列表
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

// 获取主题下所有文章
async function getTopicArticles(req) {
  const id = req.params.id;
  const topic = await Topic.findOne({
    _id: id,
  });
  const restaurant = await Restaurant
    .find({ topic: id })
    .populate('comments')
    .then(rest => Promise.resolve({
      topic,
      articles: rest.map(item => handleRestaurant(item._doc)),
    }))
    .catch(err => Promise.resolve({
      error: err.message,
    }));
  return restaurant;
}

// 删除主题
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
      .sort({ _id: -1 });
    return promise;
  });
  return Promise.all(promiseList).then((values) => {
    topics = topics.map((item, index) => ({
      ...item._doc,
      articles: values[index].map(value => handleRestaurant(value._doc)),
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
