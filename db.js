const promise = require('bluebird');

const config = {
	host: process.env.RDS_HOSTNAME,
	port: process.env.RDS_PORT,
	database: process.env.RDS_DB_NAME,
	user: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD
};

const options = {
	promiseLib: promise,
	query(e)
	{
		console.log('QUERY:', e.query);
	}
};

const pgp = require('pg-promise')(options);
const db = pgp(config);

module.exports = db;