const express = require('express');
const router = new express.Router();
const promise = require('bluebird');
const config = require('../dbconfig').config;

const options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
const db = pgp(config);

/* GET home page. */
router.get('/', (req, res, next) =>
{
	// db.any('select * from flavors')
	// 	.then(function (result)
	// 	{
	// 		console.log(result);
	res.render('index', {title: 'theBRATcrew'});
	// })
	// .catch(function (err)
	// {
	// 	console.log(err);
	// });
});

router.get('/contact', (req, res, next) =>
{
	res.render('contact', {});
});

router.get('/about', (req, res, next) =>
{
	res.render('about', {});
});

/** @class all_flavors
 *  @property name
 *  @property description
 *  @property image_path **/
router.get('/all_flavors', (req, res, next) =>
{
	console.time('test');
	db.any('select * from flavors')
		.then(function (result)
		{
			res.render('redirects/all_flavors', {all_flavors: result});
			console.timeEnd('test');
		})
		.catch(function (err)
		{
			console.log(err);
		});
});

router.get('/candy_flavors', (req, res, next) =>
{
	res.render('redirects/candy_flavors', {});
});

router.get('/desert_flavors', (req, res, next) =>
{
	res.render('redirects/desert_flavors', {});
});

router.get('/drink_flavors', (req, res, next) =>
{
	res.render('redirects/drink_flavors', {});
});

router.get('/fruit_flavors', (req, res, next) =>
{
	res.render('redirects/fruit_flavors', {});
});

router.get('/special_flavors', (req, res, next) =>
{
	res.render('redirects/special_flavors', {});
});

router.get('/tobacco_flavors', (req, res, next) =>
{
	res.render('redirects/tobacco_flavors', {});
});

module.exports = router;