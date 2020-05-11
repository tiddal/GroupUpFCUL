const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
	const id = uuidv4();
	const hashed_password = bcrypt.hashSync('password', 10);
	return knex('User')
		.insert([
			{
				id,
				username: 'fc00002',
				first_name: 'Professor',
				last_name: 'Test',
				email: 'fc00002@test.com',
				password: hashed_password,
			},
		])
		.then(function () {
			return knex('Professor').insert([
				{ user_id: id, room: '1.1.1', department: 'DI' },
			]);
		});
};
