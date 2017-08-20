const express = require('express');
const rest = require('../../control/restaurantdb');
const handleRes = require('../../utils').handleRes;

const router = new express.Router();

// 增加评论信息
router.put('/:id', (req, res) => {
  rest.addComment(req).then((result) => {
    handleRes(result, res);
  });
});

module.exports = router;
