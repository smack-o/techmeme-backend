const express = require('express');
const { login, user } = require('../../control/login-bg');
const { handleRequest } = require('../../utils');

const router = new express.Router();

router.post('/login', (req, res) => {
  handleRequest({
    func: login,
    req,
    res,
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send({
        status: 500,
        msg: err,
      });
    } else {
      res.send({
        status: 200,
        msg: 'ok',
      });
    }
  });
});

router.get('/user', (req, res) => {
  handleRequest({
    func: user,
    req,
    res,
  });
});

module.exports = router;
