const express = require('express');
const rest = require('../../control/restaurantdb');
const handleRes = require('../../utils').handleRes;

const router = new express.Router();

/**
 * @api {post} /restaurant 发布餐厅信息
 * @apiName 发布餐厅信息
 * @apiGroup restaurant
 * @apiParam {String} name 餐厅的名字
 * @apiParam {String} name_en 餐厅的英文名字
 * @apiParam {Number} price 价格
 * @apiParam {String} picture 图片
 * @apiParam {String} topic 主题
 * @apiParam {String} reason 推荐理由
 * @apiParam {String} address 地点
 * @apiParam {String} businessHours 工作时间
 * @apiParam {String} lng_lat 经纬度
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


/**
 * @api {get} /list/[:page_num]/[:page_size] 获取所有餐厅信息
 * @apiName 获取所有餐厅信息 restaurant list
 * @apiGroup restaurant
 * @apiParam {Number} page_num 页数
 * @apiParam {Number} page_size 每页数量
 *
 * @apiSuccess {String} name 餐厅的名字
 * @apiSuccess {Number} price 价格
 * @apiSuccess {String} picture 图片
 * @apiSuccess {String} topic 主题
 * @apiSuccess {String} reason 推荐理由
 * @apiSuccess {String} address 地点
 * @apiSuccess {String} businessHours 工作时间
 * @apiSuccess {Number} longitude 经度
 * @apiSuccess {Number} latitude 纬度
 * @apiSuccess {Object} comments 评论信息
 *
 * @apiSuccessExample Success-Response
 *    HTTP/1.1 200 OK
 *    {
 *      status: 200,
 *      data: {
 *        name: '可可西里',
 *        price: 880,
 *        picture: ['www.baidu.com'],
 *        topic: '美味天下',
 *        reason: '美女钟爱',
 *        address: '可可西里',
 *        businessHours: ['8','17.30'],
 *        longitude: 120,
 *        latitude: 87,
 *        comments: [
 *          {
 *            openId: 65465465464,
 *            userName: 'kiratech'
 *            avatar: 'www.baidu.com',
 *            contents: '这家餐厅不错'
 *            likes: ['美美的', '小么么'],
 *            nominate:[]
 *          }
 *        ]
 *      }
 *    }
 */
router.get('/list', (req, res) => {
  const page = req.query.page_num || 1;
  const num = req.query.page_size || 5;
  rest.getAllRestaurant(page, num).then((result) => {
    // console.warn(result);
    handleRes(result, res);
  });
});


/**
 * @api {get} /restaurant/:id 获取餐厅信息
 * @apiName 获取餐厅信息 restaurant get
 * @apiGroup restaurant
 * @apiParam {Number} id 餐厅的ID值
 * @apiSuccess {String} name 餐厅的名字
 * @apiSuccess {Number} price 价格
 * @apiSuccess {String} picture 图片
 * @apiSuccess {String} topic 主题
 * @apiSuccess {String} reason 推荐理由
 * @apiSuccess {String} address 地点
 * @apiSuccess {String} businessHours 工作时间
 * @apiSuccess {Number} longitude 经度
 * @apiSuccess {Number} latitude 纬度
 * @apiSuccess {Object} comments 评论信息
 *
 * @apiSuccessExample Success-Response
 *    HTTP/1.1 200 OK
 *    {
 *      status: 200,
 *      data: {
 *        name: '可可西里',
 *        price: 880,
 *        picture: ['www.baidu.com'],
 *        topic: '美味天下',
 *        reason: '美女钟爱',
 *        address: '可可西里',
 *        businessHours: ['8','17.30'],
 *        longitude: 120,
 *        latitude: 87,
 *        comments: [
 *          {
 *            openId: 65465465464,
 *            userName: 'kiratech'
 *            avatar: 'www.baidu.com',
 *            contents: '这家餐厅不错'
 *            likes: ['美美的', '小么么'],
 *            nominate:[]
 *          }
 *        ]
 *      }
 *    }
 */

// 获取餐厅信息(ok)
router.get('/:id', (req, res) => {
  rest.getRestaurant(req).then((result) => {
    handleRes(result, res);
  });
});

/**
 * @api {put} /restaurant/:id 更新餐厅信息
 * @apiName 更新餐厅信息 restaurant put
 * @apiGroup restaurant
 * @apiParam {Number} id 餐厅的id值
 *
 * @apiSuccess {Number} status 状态信息
 * @apiSuccess {String} data 数据信息
 *
 * @apiSuccessExample Success-Response
 *    HTTP/1.1 200 OK
 *  {
 *    status: 200,
 *    data: '餐厅信息更新成功'
 *  }
 */

// 更新餐厅信息(ok)
router.put('/:id', (req, res) => {
  rest.updateRestaurant(req).then((result) => {
    handleRes(result, res);
  });
});


/**
* @api {delete} /restaurant/:id 删除餐厅信息
* @apiName 删除餐厅信息 restaurant delete
* @apiGroup restaurant
* @apiParam {Number} id 餐厅的id值
*
* @apiSuccess {Number} status 状态信息
* @apiSuccess {String} data 数据信息
*
* @apiSuccessExample Success-Response
*    HTTP/1.1 200 OK
*  {
*    status: 200,
*    data: '餐厅信息删除成功'
*  }
*/
// 删除餐厅信息(ok)
router.delete('/:id', (req, res) => {
  rest.deleteRestaurant(req).then((result) => {
    handleRes(result, res);
  });
});

module.exports = router;
