const express = require('express');
const path = require('path');

const router = express.Router();

/* GET users listing. */
router.get('*', (req, res) => {
  res.sendfile(path.join(__dirname, '../admin-client/dist/index.html'));
});

module.exports = router;
