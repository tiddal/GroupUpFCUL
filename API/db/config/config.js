require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DEV_DB_USER,
		password: process.env.DEV_DB_PASSWORD,
		database: process.env.DEV_DB_NAME,
		host: process.env.DEV_DB_HOST,
		dialect: 'mysql',
		define: {
			timestamps: true,
			underscored: false
		}
	},
	test: {
		username: process.env.TEST_DB_USER,
		password: process.env.TEST_DB_PASSWORD,
		database: process.env.TEST_DB_NAME,
		host: process.env.TEST_DB_HOST,
		dialect: 'mysql',
		dialectOptions: {
			ssl: 'Amazon RDS'
		},
		define: {
			timestamps: true,
			underscored: false
		}
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: 'mysql',
		dialectOptions: {
			ssl: 'Amazon RDS'
		},
		define: {
			timestamps: true,
			underscored: false
		}
	}
};
