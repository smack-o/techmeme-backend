const express = require('express');
const recommend = require('../../control/recommenddb');
const handleRes = require('../../utils').handleRes;

const router = new express.Router();

// 发布推荐信息
router.post('/', (req, res) => {
  recommend.addRecommend(req).then((result) => {
    handleRes(result, res);
  });
});

// 获取所有的推荐信息
router.get('/list', (req, res) => {
  const page = req.query.page_num || 1;
  const num = req.query.page_size || 5;
  recommend.getAllRecommend(page, num).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});

// 获取单个推荐信息
router.get('/:id', (req, res) => {
  recommend.getRecommend(req).then((result) => {
    handleRes(result, res);
  });
});

// 更新推荐信息
router.put('/:id', (req, res) => {
  recommend.updateRecommend(req).then((result) => {
    handleRes(result, res);
  });
});

module.exports = router;
