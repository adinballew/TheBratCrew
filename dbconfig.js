// Configurations stored in Environment Variables
module.exports = {
	config: {
		host: process.env.RDS_HOSTNAME,
		port: process.env.RDS_PORT,
		database: process.env.RDS_DB_NAME,
		user: process.env.RDS_USERNAME,
		password: process.env.RDS_PASSWORD
	}
};