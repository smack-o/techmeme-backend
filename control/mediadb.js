const Media = require('../models/media').Media;

async function addMedia(path) {
  const media = new Media({
    path,
  });
  await media.save();
  return {
    status: 200,
    data: {
      filename: path,
    },
    msg: '图片上传成功',
  };
}

module.exports = {
  addMedia,
};
