var express = require('express');
var router = express.Router();
var User = require('../models/user');
var CMS = require('../models/cms');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/index', { title: 'Biman Ghoshal' });
});

/* GET home page. */
router.get('/users', function (req, res, next) {
    User.find(function(err, data){
        if(err){
            console.log(err);
        }
        res.render('admin/users/list', { title: 'Users List', users: data });
    }); 
});

router.get('/user/add', function (req, res, next) {
    res.render('admin/users/add', { title: 'Users Add Page' });
});

router.post('/user/add', function(req, res, next){
    if (!req.body.username){
        res.render('admin/users/add', { title: 'Users Add Page', message: "Username Required" });
    }else if(!req.body.password){
        res.render('admin/users/add', { title: 'Users Add Page', message: "Password Required"});
    } else if (req.body.password.length < 6){
        res.render('admin/users/add', { title: 'Users Add Page', message: "Minimum 6 charector is Required" });
    }else{
        next();
    }
}, function(req, res, next){
    var u = new User(req.body);
    u.save().then(function(data){
        console.log(data);

        res.redirect('/admin/users');
    }).catch(function(err){
        console.log(err);
        res.render('admin/users/add', { title: 'Users Add Page', message: "Database Error: "+err.message });
    });
});

router.get('/user/edit/:id', function(req, res, next){
    User.findById(req.params.id, function(err, data){
        console.log(data);

        res.render('admin/users/edit', { title: 'Users Add Page', user: data });
    });
});

router.post('/user/edit', function(req, res, next){
    User.findByIdAndUpdate(req.body.id, req.body).then(data => {
        console.log(data);
        res.redirect('/admin/users');
    });
});

router.get('/user/delete/:id', function (req, res, next) {
    User.findByIdAndRemove(req.params.id, function (err, data) {
        console.log(data);
        res.redirect('/admin/users');
    });
});

//manage cms

router.get('/cms/list', function (req, res, next) {
    CMS.find(function(err, data){
        if(err){
            console.log(err);
        }
        res.render('admin/cms/list', { title: 'CMS List', cms: data });
    }); 
});

router.get('/cms/add', function (req, res, next) {
    res.render('admin/cms/add', { title: 'CMS Add Page' });
});

router.post('/cms/add', function(req, res, next){
    if (!req.body.post_title){
        res.render('admin/cms/add', { title: 'CMS Add Page', message: "Title Required" });
    }else if(!req.body.post_content){
        res.render('admin/cms/add', { title: 'CMS Add Page', message: "Description Required"});
    }else{
        next();
    }
}, function(req, res, next){
    var u = new CMS(req.body);
    u.save().then(function(data){
        console.log(data);

        res.redirect('/admin/cms/list');
    }).catch(function(err){
        console.log(err);
        res.render('admin/cms/add', { title: 'CMS Add Page', message: "Database Error: "+err.message });
    });
});

router.get('/cms/delete/:id', function (req, res, next) {
    CMS.findByIdAndRemove(req.params.id, function (err, data) {
        console.log(data);
        res.redirect('/admin/cms/list');
    });
});

module.exports = router;
