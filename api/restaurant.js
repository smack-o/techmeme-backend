/**
 * @apiDefine restaurant
 *
 * @apiError restaurant 所有餐厅的一切.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "餐厅未找到"
 *     }
 */
/**
 * @api {post} /v1/addRestaurant 发布餐厅信息
 * @apiName 发布餐厅信息
 * @apiGroup admin
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
/**
 * @api {get} /v1/getAll/:page 获取所有餐厅信息
 * @apiName 获取所有餐厅信息
 * @apiGroup all
 *
 * @apiParam {Number} page 页数
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
/**
 * @api {get} /v1/getRestaurant/:id 获取餐厅信息
 * @apiName 获取餐厅信息
 * @apiGroup getRestaurant
 *
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
/**
 * @api {put} /v1/updataRestaurant/:id 更新餐厅信息
 * @apiName 更新餐厅信息
 * @apiGroup update
 *
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
 /**
 * @api {delete} /v1/deleteRestaurant/:id 删除餐厅信息
 * @apiName 删除餐厅信息
 * @apiGroup delete
 *
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
