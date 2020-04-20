const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('User')
		.del()
		.then(function () {
			// Inserts seed entries
			const id = uuidv4();
			const hashed_password = bcrypt.hashSync('password', 10);
			return knex('User')
				.insert([
					{
						id,
						username: 'fc000000',
						first_name: 'Admin',
						last_name: 'Test',
						email: 'fc000000@test.com',
						password: hashed_password,
					},
				])
				.then(function () {
					return knex('Admin').insert([{ user_id: id, previleges: 1 }]);
				});
		});
};
