var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'theBRATcrew',
        copyright: '| © 2017 theBRATcrew LLC | All Right Reserved ' + new Date().getFullYear()
    });
});
// router.get('/about', function (req, res, next)
// {
// 	res.render('about', {});
// });
// router.get('/contact', function (req, res, next)
// {
// 	res.render('contact', {});
// });

module.exports = router;