const express = require('express');
const problemfeed = require('../../control/problemfeedbackdb');
const handleRes = require('../../utils').handleRes;

const router = new express.Router();
// 增加反馈信息(ok)
router.post('/', (req, res) => {
  problemfeed.addfeedback(req).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
// 删除反馈信息(ok)
router.delete('/:id', (req, res) => {
  problemfeed.deleteFeedBack(req).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
// 根据处理转态获取反馈信息(ok)
router.get('/status', (req, res) => {
  console.warn(req.query);
  problemfeed.getStatusFeedBack(req).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
// 获取所有的反馈信息(ok)
router.get('/list', (req, res) => {
  problemfeed.getAllFeedBack().then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
// 获取单个反馈信息(ok)
router.get('/:id', (req, res) => {
  problemfeed.getFeedBack(req).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
// 获取用户所有的反馈信息(ok)
router.get('/user/:openId', (req, res) => {
  problemfeed.getFeedBackByOpenId(req).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
// 更新反馈信息(ok)
router.put('/:id', (req, res) => {
  problemfeed.updateFeedBack(req).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});

module.exports = router;
