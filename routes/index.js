var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Biman Ghoshal' });
});*/

router.get('/', function(req, res, next) {
    User.find(function(err, data){
      if(err){
          console.log(err);
      }
      res.render('admin/users/list', { title: 'Users Lists', users: data });
    });
});

module.exports = router;
