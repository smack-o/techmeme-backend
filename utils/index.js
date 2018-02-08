// 处理响应信息
function handleRes(result, res) {
  if (result && result.error) {
    res.status(400).json({
      status: 400,
      msg: result.error,
    });
    return;
  }
  res.json({
    data: result,
    status: 200,
    msg: 'ok',
  });
}

const concatImageUrl = uuid => `http://ouz3wc3vv.bkt.clouddn.com/${uuid}`;

const restaurantImageUrl = (restaurant) => {
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
  concatImageUrl,
  restaurantImageUrl,
};
