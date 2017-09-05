var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'theBRATcrew',
        copyright: '| © 2017 theBRATcrew LLC | All Right Reserved ' + new Date().getFullYear()
    });
});
// router.get('/cart', function (req, res, next)
// {
// 	res.render('cart', {});
// });

module.exports = router;