var express = require('express');
var router = express.Router();

/* get主页*/
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
