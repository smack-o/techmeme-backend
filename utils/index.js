const config = require('../config/techmeme-backend-config');
const debug = require('debug')('techmeme-backend:error');

const PRODUCTION = process.env.NODE_ENV === 'production';

// 处理响应信息
function handleRes(result, res) {
  if (result && result.error) {
    res.status(result.status || 400).json({
      error: result.error,
      msg: result.msg || result.error,
    });
    return;
  }
  res.json({
    data: result,
    status: 200,
    msg: 'ok',
  });
}

const handleRequest = async ({ func, req, res }) => {
  let result;
  try {
    result = await func(req, res);
  } catch (e) {
    debug(e);
    result = {
      error: e,
      msg: e.message,
    };
  }
  handleRes(result, res);
};

const concatImageUrl = uuid => `http://ouz3wc3vv.bkt.clouddn.com/${uuid}`;

const handleRestaurant = (restaurant) => {
  if (!restaurant) {
    return restaurant;
  }
  return {
    ...restaurant,
    pictures: restaurant.pictures.map(picture => ({
      name: picture,
      url: concatImageUrl(picture),
    })),
  };
};

let mongodb = 'mongodb://127.0.0.1:27017/techmeme';
let sessionSecret = 'test';

if (PRODUCTION) {
  const mongo = config.mongo;
  mongodb = `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}?authSource=${mongo.authSource}`;
  sessionSecret = config.sessionSecret;
}

module.exports = {
  handleRes,
  handleRequest,
  concatImageUrl,
  handleRestaurant,
  mongodb,
  sessionSecret,
};
