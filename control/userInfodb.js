const UserInfo = require('../models/userInfo');
// 增加用户信息
async function addUserInfo(req) {
  const user = new UserInfo(req.body);
  await user.save();
  return {
    status: 200,
    msg: '用户信息保存成功',
  };
}
// 删除用户信息
async function deleteUserInfo(req) {
  const id = req.params.id ? req.params.id : null;
  let result = {};
  if (!id) {
    result = {
      status: 404,
      msg: '请输入正确的id',
    };
  }
  await UserInfo.findByIdAndRemoveQ(id)
   .then(() => {
     result = {
       status: 200,
       msg: '用户删除成功',
     };
   });
  return result;
}
// 更新用户信息
async function updateUserInfo(req) {
  const id = req.params.id ? req.params.id : null;
  console.warn(req.body);
  let result = {};
  if (!id) {
    result = {
      status: 404,
      msg: '请输入正确的用户id',
    };
  }
  await UserInfo.findByIdQ(id)
  .then((user) => {
    console.warn(user);
    user.update(req.body).exec();
  });
  result = {
    status: 200,
    msg: '用户信息更新成功',
  };
  return result;
}
// 获取用户信息
async function getUserInfo(req) {
  const openId = req.params.id;
  let results = {};
  await UserInfo.findOne({ openId }).exec((err, user) => {
    results = user;
  });
  return results;
}
// 获取所有的用户
async function getAllUserInfo() {
  let results = {};
  await UserInfo.find().exec((err, users) => {
    results = users;
  });
  return results;
}
module.exports = {
  addUserInfo,
  deleteUserInfo,
  updateUserInfo,
  getUserInfo,
  getAllUserInfo,
};
