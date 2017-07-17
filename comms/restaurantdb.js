const Restaurant = require('../models/restaurant');

function addRestaurant(data) {
  const promise = new Promise((resolve) => {
    const resta = new Restaurant(data);
    resta.save((err) => {
      if (err) {
        resolve(err);
      } else {
        const result = {
          code: 200,
          status: 'ok',
        };
        resolve(result);
      }
    });
  });
  return promise;
}

exports.addRestaurant = addRestaurant; // 增加餐厅信息
