const express = require('express');
const { addTopic, getTopicList, getTopicArticles, updateTopic, deleteTopic } = require('../../control/topicdb');
const { handleRequest } = require('../../utils');

const router = new express.Router();

/**
 * @api {post} /topic 增加新主题
 * @apiName 新主题
 * @apiGroup topic
 * @apiParam {String} name 主题名字
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
  handleRequest({
    func: addTopic,
    req,
    res,
  });
});


/**
 * @api {put} /topic 更新主题
 * @apiName 新主题
 * @apiGroup topic
 * @apiParam {String} name 主题名字
 * @apiParam {Blo} name 主题名字
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

router.put('/:id', (req, res) => {
  handleRequest({
    func: updateTopic,
    req,
    res,
  });
});

/**
 * @api {get} /topic 获取主题列表
 * @apiName 新主题
 * @apiGroup topic
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

router.get('/list', (req, res) => {
  handleRequest({
    func: getTopicList,
    req,
    res,
  });
});


/**
 * @api {get} /topic 获取该主题下所有内容
 * @apiName 获取该主题下所有内容
 * @apiGroup topic
 * @apiParam {String} id 主题 id
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

router.get('/:id', (req, res) => {
  handleRequest({
    func: getTopicArticles,
    req,
    res,
  });
});

router.delete('/:id', (req, res) => {
  handleRequest({
    func: deleteTopic,
    req,
    res,
  });
});

module.exports = router;
