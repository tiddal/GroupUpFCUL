const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
	const id = uuidv4();
	const hashed_password = bcrypt.hashSync('password', 10);
	const [user] = await knex('User')
		.select('username')
		.where({ username: 'fc00000' });
	if (!user)
		return knex('User')
			.insert([
				{
					id,
					username: 'fc00000',
					first_name: 'Admin',
					last_name: 'Test',
					email: 'admin@test.com',
					password: hashed_password,
				},
			])
			.then(function () {
				return knex('Admin').insert([{ user_id: id, previleges: 1 }]);
			});
};
