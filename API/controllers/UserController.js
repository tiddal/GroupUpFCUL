const connection = require('../db/config/connection');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const errors = require('../utils/errors');

class UserController {
	async index(request, response) {
		const users = await connection('users').select([
			'username',
			'first_name',
			'last_name',
			'email',
			'avatar_url',
			'status',
		]);
		return response.json(users);
	}

	async find(request, response, next) {
		const { username } = request.params;
		const [user] = await connection('users')
			.select([
				'username',
				'first_name',
				'last_name',
				'email',
				'avatar_url',
				'status',
			])
			.where('username', username);
		if (!user) return next(errors.USER_NOT_FOUND());
		return response.json(user);
	}

	async store(request, response, next) {
		const createdUsers = {
			students: [],
			professors: [],
			admins: [],
		};

		for (let user of request.body.users) {
			const { username, first_name, last_name, email, password, role } = user;
			const id = uuidv4();
			const hashed_password = bcrypt.hashSync(password, 14);
			try {
				const [createdUser] = await connection('users').insert(
					{
						id,
						username,
						first_name,
						last_name,
						email,
						password: hashed_password,
					},
					['username']
				);
				switch (role.type) {
					case 'student':
						await connection('students').insert({ username });
						createdUsers.students.push(createdUser);
						break;
					case 'professor':
						await connection('professors').insert({ username, ...role.data });
						createdUsers.professors.push(createdUser);
						break;
					case 'admin':
						await connection('admins').insert({ username, ...role.data });
						createdUsers.admins.push(createdUser);
						break;
					default:
						break;
				}
			} catch (error) {
				return response.status(409).json({
					error: errors.UNIQUE_CONSTRAIN(error),
					created: createdUsers,
				});
			}
		}

		return response.status(201).json(createdUsers);
	}

	async modify(request, response, next) {
		//	Check if the avatar was uploaded and gets its location
		const avatar_url = request.file
			? request.file.location
				? request.file.location
				: `${process.env.APP_URL}/files/${request.file.key}`
			: null;

		//	Finding the User
		const { username } = request.params;
		let { password, status } = request.body.user;
		if (password) password = bcrypt.hashSync(password, 14);
		const [user] = await connection('users')
			.select('username')
			.where('username', username);
		if (!user) return next(errors.USER_NOT_FOUND());

		//	Updating the User
		const [updatedUser] = await connection('users').where(user).update(
			{
				password,
				status,
				avatar_url,
			},
			['username', 'first_name', 'last_name', 'email', 'avatar_url', 'status']
		);

		return response.json(updatedUser);
	}

	async remove(request, response, next) {
		//	Finding the User
		const { username } = request.params;
		const [user] = await connection('users')
			.select('username')
			.where('username', username);
		if (!user) return next(errors.USER_NOT_FOUND());

		// Deleting the user
		await connection('users').where(user).del();

		return response.status(204).send();
	}
}

module.exports = new UserController();
