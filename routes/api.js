const express = require('express');
const User = require('../models/backendUser');

const router = express.Router();

/* GET home page. */
// router.get('/', (req, res) => {
//   res.render('index', { title: '探索' });
// });
// 后台登录
router.use('/bg', require('./api/login-bg'));
// router.use('/bg/logout', require('./api/login-bg').logout);

router.use(async (req, res, next) => {
  if (req.method === 'GET') {
    next();
  } else if (req.session.userId) {
    // 检查 session
    const user = await User.findOne({
      _id: req.session.userId,
    });
    if (user.disable) {
      res.status(401).json({
        status: 401,
        msg: '账户已禁用',
      });
      req.session.destroy();
    } else {
      next();
    }
  } else {
    res.status(401).json({
      status: 401,
      msg: '未登陆或登陆失效',
    });
  }
});

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
