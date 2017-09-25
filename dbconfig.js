// Configurations stored in Environment Variables
module.exports = {
	config: {
		userName: process.env.RDS_USERNAME,
		password: process.env.RDS_PASSWORD,
		server: process.env.RDS_HOSTNAME,
		options: {
			database: process.env.RDS_DB_NAME,
			encrypt: true
		}
	}
}