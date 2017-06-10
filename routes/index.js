const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: '探索' });
});
router.get('/v1', (req, res) => {
  res.render('index', { title: 'v1' });
});
router.get('/v1/home', (req, res) => {
  res.render('index', { title: 'v1/home' });
});
module.exports = router;
