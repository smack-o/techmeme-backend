const Restaurant = require('../models/restaurant');

// 处理响应信息
function handleRes(result, res) {
  if (result.error) {
    res.status(400).json({
      error: result.error,
    });
    return;
  }
  res.json(result);
}
// 获取餐厅信息
function getRestaurant(req, res) {
  const promise = new Promise((resolve) => {
    Restaurant.findOne({ _id: req.params.id }).exec((err, rest) => {
      resolve(rest);
      handleRes(rest, res);
    });
  });
  return promise;
}
// 增加餐厅信息
function addRestaurant(req, res) {
  const promise = new Promise((resolve) => {
    const resta = new Restaurant(req.body.data);
    resta.save((err) => {
      if (err) {
        resolve(err);
      } else {
        const result = {
          code: 200,
          status: 'ok',
        };
        resolve(result);
        handleRes(result, res);
      }
    });
  });
  return promise;
}

exports.addRestaurant = addRestaurant; // 增加餐厅信息
exports.getRestaurant = getRestaurant; // 获取餐厅信息
