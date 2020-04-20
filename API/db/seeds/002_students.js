const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
	const id = uuidv4();
	const hashed_password = bcrypt.hashSync('password', 10);
	return knex('User')
		.insert([
			{
				id,
				username: 'fc00001',
				first_name: 'Student',
				last_name: 'Test',
				email: 'fc00001@test.com',
				password: hashed_password,
			},
		])
		.then(function () {
			return knex('Student').insert([{ user_id: id }]);
		});
};
