var mysql = require('mysql');
var mysqlconnection = mysql.createPool({
	host:process.env.DB_HOST || 'localhost',
	user:process.env.DB_USERNAME || 'root',
	password:process.env.DB_PASSWORD || '12345' ,
	database:process.env.DB_DATABASE || 'test_db'
});
module.exports = mysqlconnection;