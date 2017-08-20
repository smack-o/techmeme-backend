const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: '探索' });
});

//  餐厅
router.use('/api/restaurant', require('./api/restaurant'));

// 评论
router.use('/api/comment', require('./api/comment'));

// 用户信息
router.use('/api/user', require('./api/userInfo'));

// 反馈
router.use('/api/problem', require('./api/problem'));

module.exports = router;
