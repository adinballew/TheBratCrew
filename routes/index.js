const express = require('express');
const router = new express.Router();


/* GET home page. */
router.get('/', function (req, res, next)
{
	"use strict";
	res.render('index', {title: 'theBRATcrew'});
});

// router.get('/cart', function (req, res, next)
// {
// 	res.render('cart', {});
// });

module.exports = router;