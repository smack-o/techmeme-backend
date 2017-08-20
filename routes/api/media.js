const express = require('express');
const upLoadFile = require('../../utils/qiniu');
const handleRes = require('../../utils').handleRes;
const uuidv4 = require('uuid/v4');

const router = new express.Router();

router.post('/', async (req, res) => {
  const file = req.files.file;
  let result = {};
  try {
    const reply = await upLoadFile(uuidv4(), file.data);
    result = {
      status: 200,
      data: {
        filename: reply.key,
      },
      msg: '上传成功',
    };
  } catch (error) {
    result.error = error;
  }
  handleRes(result, res);
});

module.exports = router;
