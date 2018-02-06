const Restaurant = require('../models/restaurant').Restaurant;
const Comments = require('../models/restaurant').Comments;

// 获取所有的餐厅信息
async function getAllRestaurant(page, num) {
  const results = {};
  try {
    const startCount = (page - 1) * num;
    results.count = await Restaurant.count();
    await Restaurant.find().populate('comments')
    .skip(startCount)
    .limit(num)
    .sort({ _id: -1 })
    .exec((err, rest) => {
      results.list = rest.map((item) => {
        const result = item;
        result.pictures = item.pictures.map(picture => `/img/${picture}`);
        return result;
      });
    });
  } catch (e) {
    results.error = e.message;
  }
  return results;
}
// 获取单个餐厅信息
function getRestaurant(id) {
  return Restaurant
    .findOne({ _id: id })
    .populate('comments')
    .exec((err, rest) => Promise.resolve(Object.assign(rest, {
      pictures: rest.pictures.map(picture => `/img/${picture}`),
    })))
    .catch(err => Promise.resolve({
      error: err.message,
    }));
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
