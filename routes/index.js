const express = require('express');
const router = new express.Router();
const db = require('../db.js');
const sql = require('../sql/sql.js').queries;

/* GET home page. */
/** @class top_flavors
 *  @property name
 *  @property description
 *  @property image_path **/
router.get('/', (req, res, next) =>
{
	db.any(sql.top4)
		.then(function (result)
		{
			res.render('index', {title: 'theBRATcrew', top_flavors: result});
		})
		.catch(function (err)
		{
			console.log(err);
		});
});

router.get('/about', (req, res, next) =>
{
	res.render('about', {});
});

/** @class flavors
 *  @property name
 *  @property description
 *  @property image_path **/
router.get('/flavors', (req, res, next) =>
{
	db.any(sql.searchAll)
		.then(function (result)
		{
			res.render('flavors', {flavors: result});
		})
		.catch(function (err)
		{
			console.log(err);
		});
});

router.get('/flavors/:flavor', (req, res, next) =>
{
	db.any(sql.search, {flavor_type: req.params.flavor})
		.then(function (result)
		{
			res.render('flavors', {flavors: result});
		})
		.catch(function (err)
		{
			console.log(err);
		});
});

module.exports = router;