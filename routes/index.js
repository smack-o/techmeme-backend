const express = require('express');
const rest = require('../comms/restaurantdb');

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
router.post('/v1/addRestaurant', rest.addRestaurant);
router.get('/v1/getRestaurant/:id', rest.getRestaurant);
module.exports = router;
