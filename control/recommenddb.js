const Recommend = require('../models/recommend');
const { Restaurant } = require('../models/restaurant');
const { handleRestaurant, concatImageUrl } = require('../utils');

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
async function getAllRecommend(req) {
  const { page_num, page_size } = req.query;
  const page = Number(page_num) || 1;
  const num = Number(page_size) || 5;

  const results = {};

  const searchQuery = { ...req.query };
  delete searchQuery.page_num;
  delete searchQuery.page_size;

  let rest;
  if (!page && !num) {
    rest = await Recommend.find(searchQuery).sort({ top: -1, _id: -1 });
    // results.count
  } else {
    const startCount = (page - 1) * num;
    rest = await Recommend.find(searchQuery)
      .sort({ top: -1, _id: -1 })
      .skip(startCount)
      .limit(num);
  }

  results.count = rest.length;
  // const promiseList = rest.map(async (item) => {
  //   const doc = item._doc;
  //   const topicObj = await Topic.findOne({ _id: doc.topic });
  //   doc.topic = topicObj;
  //   return Promise.resolve(handleRestaurant(doc));
  // });
  // results.list = await Promise.all(promiseList);
  results.list = rest.map(item => handleRestaurant(item._doc));
  return results;
}
// 获取单个编辑推荐信息
async function getRecommend(req) {
  const id = req.params.id;
  const result = await Recommend
    .findOne({ _id: id })
    .then((rest) => {
      const res = handleRestaurant(rest._doc);
      return Promise.resolve({
        ...res,
        referee: {
          name: res.referee.name,
          avatar: [{
            name: res.referee.name,
            url: concatImageUrl(res.referee.avatar),
          }],
        },
      });
    })
    .catch(err => Promise.resolve({
      error: err.message,
    }));
  if (!result.error && result.articles) {
    const promiseList = result.articles.map(async (item) => {
      const restaurant = await Restaurant.findOne({ _id: item.id }, { name: 1 });
      return {
        ...item._doc,
        name: restaurant.name,
      };
    });
    result.articles = await Promise.all(promiseList);
  }
  return result;
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

async function deleteRecommend(req) {
  const id = req.params.id;
  const result = await Recommend.findByIdAndRemoveQ(id);
  return result;
}

async function getTopRecommends() {
  const results = await Recommend.find({ top: true });
  return results.map(item => handleRestaurant(item._doc));
}

module.exports = {
  addRecommend,
  getAllRecommend,
  getRecommend,
  updateRecommend,
  deleteRecommend,
  getTopRecommends,
};
