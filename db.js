const promise = require('bluebird');
const config = require('./dbconfig').config;

const options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
const db = pgp(config);

function getAllFlavors(result)
{
	"use strict";
	db.any('select * from flavors')
		.then(function (result)
		{
			console.log(result);
		})
		.catch(function (err)
		{
			console.log(err);
		});
	return result;
}

module.exports = {
	getAllFlavors: getAllFlavors
};