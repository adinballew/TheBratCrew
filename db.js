"use strict";
var promise = require('bluebird');

var config = {
	host: process.env.RDS_HOSTNAME,
	port: process.env.RDS_PORT,
	database: process.env.RDS_DB_NAME,
	user: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD
};

var options = {
	promiseLib: promise
	// query: function query(e)
	// {
	// 	console.log('QUERY:', e.query);
	// },
	// connect: function connect(client, isFresh)
	// {
	// 	var cp = client.connectionParameters;
	// 	console.log('Connected to database:', cp.database);
	// 	if (isFresh)
	// 	{
	// 		console.log('Connection is Fresh');
	// 	}
	// },
	// disconnect: function disconnect(client)
	// {
	// 	var cp = client.connectionParameters;
	// 	console.log('Disconnecting from database:', cp.database);
	// }
};

var pgp = require('pg-promise')(options);
var db = pgp(config);

module.exports = db;