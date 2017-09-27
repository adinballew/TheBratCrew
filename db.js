var promise = require('bluebird');
var config = require('./dbconfig').config;

var initOptions = {
	promiseLib: promise
};

var pgp = require('pg-promise')(initOptions);
var db = pgp(config);

module.exports = db;