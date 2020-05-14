const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
	const id = uuidv4();
	const hashed_password = bcrypt.hashSync('password', 10);
	const [user] = await knex('User')
		.select('username')
		.where({ username: 'fc00002' });
	if (!user)
		return knex('User')
			.insert([
				{
					id,
					username: 'fc00002',
					first_name: 'Professor',
					last_name: 'Test',
					email: 'professor@test.com',
					password: hashed_password,
				},
			])
			.then(function () {
				return knex('Professor').insert([
					{ user_id: id, room: '1.1.1', department: 'DI' },
				]);
			});
};
