const Restaurant = require('../models/restaurant').Restaurant;
const Comments = require('../models/restaurant').Comments;

// 获取所有的餐厅信息
async function getAllRestaurant(page, num) {
  let results = {};
  const startCount = (page - 1) * num;
  await Restaurant.find().populate('comments')
  .skip(startCount)
  .limit(num)
  .sort({ _id: -1 })
  .exec((err, rest) => {
    results = rest.map((item) => {
      const result = item;
      result.pictures = item.pictures.map(picture => `/img/${picture}`);
      return result;
    });
  });
  return results;
}
// 获取单个餐厅信息
async function getRestaurant(req) {
  const id = req.params.id;
  let results = {};
  await Restaurant.findOne({ _id: id }).populate('comments').exec((err, rest) => {
    results = rest;
  });
  return results;
}
// 发布餐厅信息
async function addRestaurant(req) {
  const resta = new Restaurant(req.body);
  await resta.save();
  return {
    status: 200,
    msg: '餐厅信息保存成功',
  };
}
// 删除餐厅信息
async function deleteRestaurant(req) {
  const id = req.params.id ? req.params.id : null;
  console.warn(id);
  let result = {};
  if (!id) {
    result = {
      status: 404,
      msg: '餐厅信息已经被删除',
    };
  }
  await Restaurant.findByIdAndRemoveQ(id)
    .then(() => {
      result = {
        status: 200,
        msg: '餐厅信息删除成功',
      };
    });
  return result;
}
// 更新餐厅信息
async function updateRestaurant(req) {
  const id = req.params.id ? req.params.id : null;
  console.warn(req.body);
  let result = {};
  if (!id) {
    result = {
      status: 404,
      msg: '没有找到该餐厅',
    };
  }
  await Restaurant.findByIdQ(id)
  .then((rest) => {
    console.warn(rest);
    rest.update(req.body).exec();
  });
  result = {
    status: 200,
    msg: '餐厅信息更新成功',
  };
  return result;
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
        status: 200,
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
