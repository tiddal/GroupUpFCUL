const pool = require('../config/pool');

exports.getAll = (table) => {
	return new Promise((resolve, reject) =>
		pool.query(`SELECT * FROM ??`, table, (err, results) =>
			err ? reject(err) : resolve(results)
		)
	);
};

exports.getById = (table, id) => {
	return new Promise((resolve, reject) =>
		pool.query(`SELECT * FROM ?? WHERE id = ?`, [table, id], (err, results) =>
			err ? reject(err) : resolve(results[0])
		)
	);
};
