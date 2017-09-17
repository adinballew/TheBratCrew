var express = require('express');
var dbConn = require('../database.js');
var router = new express.Router();

function getFlavorData(callback)
{
	"use strict";
	var sql = require('mssql');
	var request = new sql.Request(dbConn); // Maybe check to see if db is still open?

	request.query('select * from JuiceFlavors order by name asc', function (err, result)
	{
		if (err)
		{
			console.error(err);
			return;
		}
		console.log(result.recordset);
		callback(result);
	});
}

/* GET home page. */
router.get('/', function (req, res, next)
{
	"use strict";
	getFlavorData(function (result)
	{
		res.render('index', {title: 'theBRATcrew', flavors: result.recordset});
	});
});

// router.get('/cart', function (req, res, next)
// {
// 	res.render('cart', {});
// });

module.exports = router;