const pool = require('./config/pool');

let users = {};

users.all = () => {
	return new Promise((resolve, reject) =>
		pool.query(`SELECT * FROM users`, (err, results) =>
			err ? reject(err) : resolve(results)
		)
	);
};

users.byId = (id) => {
	return new Promise((resolve, reject) =>
		pool.query(`SELECT * FROM users WHERE id = ?`, id, (err, results) =>
			err ? reject(err) : resolve(results[0])
		)
	);
};

module.exports = users;
