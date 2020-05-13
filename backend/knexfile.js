require('dotenv').config();

module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB,
		},
		migrations: {
			directory: './API/db/migrations',
		},
		seeds: {
			directory: './API/db/seeds',
		},
	},

	test: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: 'groupup_test',
		},
		migrations: {
			directory: './API/db/migrations',
		},
		seeds: {
			directory: './API/db/seeds',
		},
	},

	production: {
		client: 'pg',
		connection: {
			host: process.env.RDS_HOSTNAME,
			user: process.env.RDS_USERNAME,
			password: process.env.RDS_PASSWORD,
			database: process.env.RDS_DB_NAME,
		},
		migrations: {
			directory: './API/db/migrations',
		},
		seeds: {
			directory: './API/db/seeds',
		},
	},
};
