const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
	const id = uuidv4();
	const hashed_password = bcrypt.hashSync('password', 10);
	const [user] = await knex('User')
		.select('username')
		.where({ username: 'fc00001' });
	if (!user)
		return knex('User')
			.insert([
				{
					id,
					username: 'fc00001',
					first_name: 'Student',
					last_name: 'Test',
					email: 'student@test.com',
					password: hashed_password,
				},
			])
			.then(function () {
				return knex('Student').insert([{ user_id: id }]);
			});
};
