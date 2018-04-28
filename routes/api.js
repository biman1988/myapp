var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/users', function(req, res, next){
    User.find(function(err, data){
        if(err){
            console.log(err);
        }

        res.json(data);
    });
});

router.post('/user/add', function (req, res, next) {
    var u = new User(req.query);
    u.save().then((data)=>{
        console.log("Data Inserted");
        res.json({status: 'Success', message: 'Data Adeed Successfully'})
    }).catch((err) =>{
        console.log("Error: "+err);
        res.json({ status: 'Error', message: err })
    });
});

module.exports = router;