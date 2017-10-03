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
/** @class top_flavors
 *  @property name
 *  @property description
 *  @property image_path **/
router.get('/', (req, res, next) =>
{
	console.time('test');
	db.any("select * from flavors limit 4") //Add functionality for popularity
		.then(function (result)
		{
			res.render('index', {title: 'theBRATcrew', top_flavors: result});
			console.timeEnd('test');
		})
		.catch(function (err)
		{
			console.log(err);
		});
});

/** @class all_flavors
 *  @property name
 *  @property description
 *  @property image_path **/
router.get('/all_flavors', (req, res, next) =>
{
	console.time('test');
	db.any("select * from flavors")
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

/** @class candy_flavors
 *  @property name
 *  @property description
 *  @property image_path **/
router.get('/candy_flavors', (req, res, next) =>
{
	console.time('test');
	db.any("select * from flavors where flavor_type = 'Candy'")
		.then(function (result)
		{
			res.render('redirects/candy_flavors', {candy_flavors: result});
			console.timeEnd('test');
		})
		.catch(function (err)
		{
			console.log(err);
		});
});

/** @class desert_flavors
 *  @property name
 *  @property description
 *  @property image_path **/
router.get('/desert_flavors', (req, res, next) =>
{
	console.time('test');
	db.any("select * from flavors where flavor_type = 'Desert'")
		.then(function (result)
		{
			res.render('redirects/desert_flavors', {desert_flavors: result});
			console.timeEnd('test');
		})
		.catch(function (err)
		{
			console.log(err);
		});
});

/** @class drink_flavors
 *  @property name
 *  @property description
 *  @property image_path **/
router.get('/drink_flavors', (req, res, next) =>
{
	console.time('test');
	db.any("select * from flavors where flavor_type = 'Drink'")
		.then(function (result)
		{
			res.render('redirects/drink_flavors', {drink_flavors: result});
			console.timeEnd('test');
		})
		.catch(function (err)
		{
			console.log(err);
		});
});

/** @class fruit_flavors
 *  @property name
 *  @property description
 *  @property image_path **/
router.get('/fruit_flavors', (req, res, next) =>
{
	console.time('test');
	db.any("select * from flavors where flavor_type = 'Fruit'")
		.then(function (result)
		{
			res.render('redirects/fruit_flavors', {fruit_flavors: result});
			console.timeEnd('test');
		})
		.catch(function (err)
		{
			console.log(err);
		});
});


/** @class special_flavors
 *  @property name
 *  @property description
 *  @property image_path **/
router.get('/special_flavors', (req, res, next) =>
{
	console.time('test');
	db.any("select * from flavors where flavor_type = 'Special'")
		.then(function (result)
		{
			res.render('redirects/special_flavors', {special_flavors: result});
			console.timeEnd('test');
		})
		.catch(function (err)
		{
			console.log(err);
		});
});
/** @class tobacco_flavors
 *  @property name
 *  @property description
 *  @property image_path **/
router.get('/tobacco_flavors', (req, res, next) =>
{
	console.time('test');
	db.any("select * from flavors where flavor_type = 'Tobacco'")
		.then(function (result)
		{
			res.render('redirects/tobacco_flavors', {tobacco_flavors: result});
			console.timeEnd('test');
		})
		.catch(function (err)
		{
			console.log(err);
		});
});

module.exports = router;