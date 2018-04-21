var express = require('express');
var router = express.Router();

/* GET users listing. */
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('users/index', { title: 'SHibaji Debnath' });
});

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
