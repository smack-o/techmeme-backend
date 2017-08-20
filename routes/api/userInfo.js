const express = require('express');
const userInfo = require('../../control/userInfodb');
const handleRes = require('../../utils').handleRes;

const router = new express.Router();
// 增加用户信息(ok)
router.post('/', (req, res) => {
  userInfo.addUserInfo(req, res).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
// 获取所有用户(ok)
router.get('/list', (req, res) => {
  userInfo.getAllUserInfo().then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
// 获取用户信息(ok)
router.get('/:id', (req, res) => {
  userInfo.getUserInfo(req).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
// 更新用户信息(ok)
router.put('/:id', (req, res) => {
  userInfo.updateUserInfo(req).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
router.delete('/:id', (req, res) => {
  userInfo.deleteUserInfo(req).then((result) => {
    console.warn(result);
    handleRes(result, res);
  });
});
// router.put('/:id', (req, res) => {
// });

module.exports = router;
