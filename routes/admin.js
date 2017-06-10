const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('index', { title: '管理后台' });
});

module.exports = router;
