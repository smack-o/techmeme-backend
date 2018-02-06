const express = require('express');
const upLoadFile = require('../../utils/qiniu');
const handleRes = require('../../utils').handleRes;
const uuidv4 = require('uuid/v4');
const mediadb = require('../../control/mediadb');

const router = new express.Router();

router.post('/', async (req, res) => {
  let result = {};
  try {
    const file = req.files.file;
    const reply = await upLoadFile(uuidv4(), file.data);
    result = await mediadb.addMedia(reply.key);
  } catch (error) {
    result.error = error.message;
  }
  handleRes(result, res);
});

module.exports = router;
