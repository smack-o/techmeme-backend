const express = require('express');
const rest = require('../../control/restaurantdb');
const handleRes = require('../../utils').handleRes;

const router = new express.Router();

// 发布餐厅信息(ok)
router.post('/', (req, res) => {
  rest.addRestaurant(req, res).then((result) => {
    handleRes(result, res);
  });
});
// 获取所有餐厅信息(ok)
router.get('/list', (req, res) => {
  const page = req.query.page_num || 1;
  const num = req.query.page_size || 5;
  rest.getAllRestaurant(page, num).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
// 获取餐厅信息(ok)
router.get('/:id', (req, res) => {
  rest.getRestaurant(req).then((result) => {
    handleRes(result, res);
  });
});
// 更新餐厅信息(ok)
router.put('/:id', (req, res) => {
  rest.updateRestaurant(req).then((result) => {
    handleRes(result, res);
  });
});
// 删除餐厅信息(ok)
router.delete('/:id', (req, res) => {
  rest.deleteRestaurant(req).then((result) => {
    handleRes(result, res);
  });
});

module.exports = router;
