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
		connection: process.env.DB_URL,
		migrations: {
			directory: './API/db/migrations',
		},
		seeds: {
			directory: './API/db/seeds',
		},
	},
};
