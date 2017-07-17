var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "Index"});
});

router.get('/generate/token', function(req, res, next) {
  res.render('form', {title: "Creando Token"});
});

module.exports = router;