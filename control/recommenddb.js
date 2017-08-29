const Recommend = require('../models/recommend');

// 发布编辑推荐信息
async function addRecommend(req) {
  const recommend = new Recommend(req.body);
  await recommend.save();
  return {
    status: 200,
    msg: '发布编辑推荐信息成功',
  };
}

// 获取所有的编辑推荐的信息
async function getAllRecommend(page, num) {
  let results = {};
  const startCount = (page - 1) * num;
  await Recommend.find().skip(startCount)
  .limit(num)
  .sort({ _id: -1 })
  .exec((err, recommend) => {
    results = recommend;
  });
  return results;
}
// 获取单个编辑推荐信息
async function getRecommend(req) {
  const id = req.params.id;
  let results = {};
  await Recommend.findOne({ _id: id }).exec((err, recommend) => {
    results = recommend;
  });
  return results;
}
// 更新推荐信息
async function updateRecommend(req) {
  const id = req.params.id;
  let results = {};
  await Recommend.findByIdQ(id)
  .then((recommend) => {
    console.warn(recommend);
    recommend.update(req.body).exec();
  });
  results = {
    status: 200,
    msg: '推荐信息更新成功',
  };
  return results;
}
module.exports = {
  addRecommend,
  getAllRecommend,
  getRecommend,
  updateRecommend,
};
