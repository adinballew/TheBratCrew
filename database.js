var sql = require("mssql");
var dbConn;

// Configurations stored in Environment Variables
var config = {
	server: process.env.RDS_HOSTNAME,
	database: process.env.RDS_DB_NAME,
	user: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD,
	port: process.env.RDS_PORT,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000
	}
};

config.parseJSON = true;

// Instantiate a connection pool
function connectDatabase()
{
	"use strict";
	if (!dbConn)
	{
		dbConn = new sql.ConnectionPool(config);

		dbConn.connect(function (err)
		{
			if (err)
			{
				console.log('Error connection database!');
				dbConn.close();
			}
			else
			{
				console.log('Database is connected!');
			}
		});
	}
	return dbConn;
}

module.exports = connectDatabase();