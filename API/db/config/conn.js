require('dotenv').config();

module.exports = (limit) => ({
	connectionLimit: limit,
	password: process.env.DB_PASSWORD,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT
});
