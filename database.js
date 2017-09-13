var sql = require("mssql");
var dbConn;

// Configurations stored in Environment Variables
var config = {
    server: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
};

// Instantiate a connection pool
function connectDatabase() {
    if (!dbConn) {
        dbConn = new sql.ConnectionPool(config);

        dbConn.connect(function (err) {
            if (!err) {
                console.log('Database is connected!')
            }
            else {
                console.log('Error connection database!')
            }
        });
    }
    return dbConn;
}

module.exports = connectDatabase();