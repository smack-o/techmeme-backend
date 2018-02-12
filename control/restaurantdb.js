const Restaurant = require('../models/restaurant').Restaurant;
const Comments = require('../models/restaurant').Comments;
const Topic = require('../models/topic');
const { restaurantImageUrl } = require('../utils');

// 获取所有的餐厅信息
async function getAllRestaurant(req) {
  const { page_num, page_size, topic } = req.query;
  const page = Number(page_num) || 1;
  const num = Number(page_size) || 5;

  const results = {};
  const startCount = (page - 1) * num;

  results.count = await Restaurant.count();

  const query = {};
  if (topic) {
    // handle topic
    query.topic = topic;
    const topicData = await Topic.findOne({ _id: topic });
    results.topicName = topicData && topicData.name;
  }
  await Restaurant.find(query).populate('comments')
  .skip(startCount)
  .limit(num)
  .sort({ _id: -1 })
  .then((rest) => {
    results.list = rest.map(item => restaurantImageUrl(item._doc));
  })
  .catch(err => Promise.resolve({
    error: err.message,
  }));
  return results;
}

// 获取单个餐厅信息
async function getRestaurant(id) {
  const restaurant = await Restaurant
    .findOne({ _id: id })
    .populate('comments')
    .then(rest => Promise.resolve(restaurantImageUrl(rest._doc)))
    .catch(err => Promise.resolve({
      error: err.message,
    }));
  return restaurant;
}
// 发布餐厅信息
function addRestaurant(req) {
  const resta = new Restaurant(req.body);
  return resta.save().then(() => Promise.resolve({
    msg: '餐厅信息保存成功',
  })).catch(e => Promise.resolve({
    error: e.message || e,
    msg: '餐厅信息保存失败',
  }));
}
// 删除餐厅信息
function deleteRestaurant(id) {
  if (!id) {
    return {
      error: '请传入正确的餐厅id',
    };
  }
  return Restaurant
    .findByIdAndRemoveQ(id)
    .then(() => Promise.resolve({
      msg: '餐厅信息删除成功',
    })).catch(e => Promise.resolve({
      error: `餐厅信息删除失败, ${e.message}`,
    }));
}
// 更新餐厅信息
function updateRestaurant(id, body) {
  if (!id) {
    return {
      error: '没有找到该餐厅',
    };
  }
  return Restaurant
    .findByIdQ(id)
    .then(rest => rest.update(body).exec())
    .then(() => Promise.resolve({
      msg: '餐厅信息更新成功',
    }))
    .catch(e => Promise.resolve({
      error: `餐厅信息更新失败, ${e.message}`,
    }));
}
// 增加评论信息
async function addComment(req) {
  const id = req.params.id;
  const msg = req.body;
  let results = {};
  await Restaurant.findOne({ _id: id }, (err, rest) => {
    const comment = new Comments(msg);
    rest.comments.unshift(comment);
    comment.save(() => {
      results = {
        msg: '增加评论信息成功',
      };
    });
  });
  return results;
}
module.exports = {
  getAllRestaurant,
  addRestaurant,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
  addComment,
};
// exports.addRestaurant = addRestaurant; // 增加餐厅信息
// exports.getRestaurant = getRestaurant; // 获取餐厅信息
