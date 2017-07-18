const express = require('express');
const rest = require('../control/restaurantdb');
// const problemfeed = require('../control/problemfeedbackdb');
// const userInfo = require('../control/userInfodb');

const router = express.Router();

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
/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: '探索' });
});
router.get('/v1', (req, res) => {
  res.render('index', { title: 'v1' });
});
router.get('/v1/home', (req, res) => {
  res.render('index', { title: 'v1/home' });
});
// 发布餐厅信息
router.post('/v1/addRestaurant', (req, res) => {
  rest.addRestaurant(req, res).then((result) => {
    handleRes(result, res);
  });
});
// 获取餐厅信息
router.get('/v1/getRestaurant/:id', (req, res) => {
  rest.getRestaurant(req).then((result) => {
    handleRes(result, res);
  });
});
// 更新餐厅信息
router.put('/v1/updataRestaurant/:id', (req, res) => {
  rest.updateRestaurant(req).then((result) => {
    handleRes(result, res);
  });
});
module.exports = router;
