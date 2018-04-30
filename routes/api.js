const express = require('express');

const router = express.Router();

/* GET home page. */
// router.get('/', (req, res) => {
//   res.render('index', { title: '探索' });
// });

//  餐厅
router.use('/restaurant', require('./api/restaurant'));

//  推荐
router.use('/recommend', require('./api/recommend'));

// 评论
router.use('/comment', require('./api/comment'));

// 用户信息
router.use('/user', require('./api/userInfo'));

// 反馈
router.use('/problem', require('./api/problem'));

// 媒体
router.use('/media', require('./api/media'));

// 主题
router.use('/topic', require('./api/topic'));

module.exports = router;
