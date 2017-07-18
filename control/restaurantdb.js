const Restaurant = require('../models/restaurant');

// 获取单个餐厅信息
async function getRestaurant(req) {
  const id = req.params.id;
  let results = {};
  await Restaurant.findByIdQ(id).then((result) => {
    results = result;
  }).catch((err) => {
    results = err;
  });
  return results;
}
// 增加餐厅信息
async function addRestaurant(req) {
  const resta = new Restaurant(req.body);
  resta.save();
  return {
    status: 200,
    data: '餐厅信息保存成功',
  };
}
// 删除餐厅信息
async function deleteRestaurant(req) {
  const id = req.params.id ? req.params.id : null;
  let result = {};
  if (!id) {
    result = {
      status: 404,
      data: '餐厅信息已经被删除',
    };
  }
  await Restaurant.findByIdAndRemoveQ(id)
    .then(() => {
      result = {
        status: 200,
        data: '餐厅信息删除成功',
      };
    })
    .catch(err => err)
    .done();
  return result;
}
// 更新餐厅信息
async function updateRestaurant(req) {
  const id = req.params.id ? req.params.id : null;
  let result = {};
  if (!id) {
    result = {
      status: 404,
      data: '没有找到该餐厅',
    };
  }
  await Restaurant.findByIdQ(id)
  .then((rest) => {
    rest.saveQ(req.body).then(() => {
      result = {
        status: 200,
        data: '餐厅信息更新成功',
      };
    });
  })
  .catch(() => {
    result = {
      status: 404,
      data: '餐厅信息更新出错',
    };
  });
  return result;
}
module.exports = {
  addRestaurant,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
// exports.addRestaurant = addRestaurant; // 增加餐厅信息
// exports.getRestaurant = getRestaurant; // 获取餐厅信息
