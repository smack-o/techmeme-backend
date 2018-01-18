const express = require('express');
const rest = require('../../control/restaurantdb');
const handleRes = require('../../utils').handleRes;

const router = new express.Router();

// 发布餐厅信息(ok)

/**
 * @api {post} /restaurant 发布餐厅信息
 * @apiName 发布餐厅信息
 * @apiGroup Restaurant
 *
 * @apiParam {String} name 餐厅的名字
 * @apiParam {Number} price 价格
 * @apiParam {String} picture 图片
 * @apiParam {String} topic 主题
 * @apiParam {String} reason 推荐理由
 * @apiParam {String} address 地点
 * @apiParam {String} businessHours 工作时间
 * @apiParam {Number} longitude 经度
 * @apiParam {Number} latitude 纬度
 *
 * @apiSuccess {Number} status 状态信息.
 * @apiSuccess {String} data  状态结果.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": 200,
 *       "data": "餐厅信息保存成功"
 *     }
 *
 */

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
    // console.warn(result);
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
