var express = require('express');
var router = new express.Router();
var config = require("../dbconfig.js").config;
var msSqlConnector = require("../msSqlConnector.js");


function queryAll(callback)
{
	var con = new msSqlConnector.msSqlConnector(config);
	con.connect().then(function ()
	{
		new con.Request("select * from JuiceFlavors")
			.onComplete(function (count, data)
			{
				if (callback)
				{
					console.log(data);
					callback(data);
				}
			})
			.onError(function (err)
			{
				console.log(err);
			}).Run();
	}).catch(function (ex)
	{
		console.log(ex);
	});
}

/* GET home page. */
/**
 * @class recordset
 * @property id
 * @property name
 * @property description
 */
router.get('/', function (req, res, next)
{
	"use strict";
	queryAll(function (data)
	{
		res.render('index', {title: 'theBRATcrew', recordset: data});
	});
});

// router.get('/cart', function (req, res, next)
// {
// 	res.render('cart', {});
// });

module.exports = router;