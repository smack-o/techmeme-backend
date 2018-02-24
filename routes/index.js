const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: '探索' });
});

//  餐厅
router.use('/api/restaurant', require('./api/restaurant'));

//  推荐
router.use('/api/recommend', require('./api/recommend'));

// 评论
router.use('/api/comment', require('./api/comment'));

// 用户信息
router.use('/api/user', require('./api/userInfo'));

// 反馈
router.use('/api/problem', require('./api/problem'));

// 媒体
router.use('/api/media', require('./api/media'));

// 主题
router.use('/api/topic', require('./api/topic'));

module.exports = router;
