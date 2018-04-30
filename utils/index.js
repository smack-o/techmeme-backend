// 处理响应信息
function handleRes(result, res) {
  if (result && result.error) {
    res.status(400).json({
      status: 400,
      error: result.error,
      msg: result.msg,
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
    result = {
      error: e.message,
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

module.exports = {
  handleRes,
  handleRequest,
  concatImageUrl,
  handleRestaurant,
};
