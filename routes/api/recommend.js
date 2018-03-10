const express = require('express');
const {
  addRecommend,
  getAllRecommend,
  getRecommend,
  updateRecommend,
  deleteRecommend,
  getTopRecommends,
} = require('../../control/recommenddb');
const { handleRequest } = require('../../utils');

const router = new express.Router();

// 发布推荐信息
router.post('/', (req, res) => {
  handleRequest({
    func: addRecommend,
    req,
    res,
  });
});

// 获取置顶推荐信息
router.get('/top', (req, res) => {
  handleRequest({
    func: getTopRecommends,
    req,
    res,
  });
});

// 获取所有的推荐信息
router.get('/list', (req, res) => {
  handleRequest({
    func: getAllRecommend,
    req,
    res,
  });
});

// 获取单个推荐信息
router.get('/:id', (req, res) => {
  handleRequest({
    func: getRecommend,
    req,
    res,
  });
});

// 更新推荐信息
router.put('/:id', (req, res) => {
  handleRequest({
    func: updateRecommend,
    req,
    res,
  });
});

router.delete('/:id', (req, res) => {
  handleRequest({
    func: deleteRecommend,
    req,
    res,
  });
});

module.exports = router;
