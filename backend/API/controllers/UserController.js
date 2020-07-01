const connection = require('../db/config/connection');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const errors = require('../utils/errors');
const aws = require('aws-sdk');

class UserController {
	constructor() {
		this.index = this.index.bind(this);
		this.find = this.find.bind(this);
		this.store = this.store.bind(this);
		this.modify = this.modify.bind(this);
		this.remove = this.remove.bind(this);
		this.findUser = this.findUser.bind(this);
	}

	async index(request, response) {
		const users = await connection('User').select([
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
		const [user] = await connection('User')
			.select([
				'username',
				'first_name',
				'last_name',
				'email',
				'avatar_url',
				'status',
				'id',
				'about',
			])
			.where({ username });

		if (!user) return next(errors.USER_NOT_FOUND(username, 'params'));
		const [admin] = await connection('Admin')
			.select('user_id')
			.where('user_id', user.id);
		const [professor] = await connection('Professor')
			.select('user_id')
			.where('user_id', user.id);
		const [student] = await connection('Student')
			.select('user_id')
			.where('user_id', user.id);
		if (admin) user.role = 'admin';
		if (professor) user.role = 'professor';
		if (student) user.role = 'student';
		delete user.id;
		return response.json(user);
	}

	async store(request, response) {
		const createdUsers = {
			students: [],
			professors: [],
			admins: [],
		};

		for (let user of request.body.users) {
			const { username, first_name, last_name, email, password, role } = user;
			const id = uuidv4();
			const hashed_password = bcrypt.hashSync(password, 10);
			try {
				const [createdUser] = await connection('User').insert(
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
						await connection('Student').insert({ user_id: id });
						createdUsers.students.push(createdUser);
						break;
					case 'professor':
						const { room, department } = role.data;
						await connection('Professor').insert({
							user_id: id,
							room,
							department,
						});
						createdUsers.professors.push(createdUser);
						break;
					case 'admin':
						const { previleges } = role.data;
						await connection('Admin').insert({ user_id: id, previleges });
						createdUsers.admins.push(createdUser);
						break;
					default:
						break;
				}
			} catch (error) {
				return response.status(409).json({
					error: errors.UNIQUE_CONSTRAIN(error.detail),
					created: createdUsers,
				});
			}
		}

		return response.status(201).json(createdUsers);
	}

	async modify(request, response, next) {
		//	Finding the User
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		if (request.body.user) {
			//	Updating the User
			let { password } = request.body.user;
			const { first_name, last_name, email, status } = request.body.user;
			if (password) password = bcrypt.hashSync(password, 10);
			try {
				const [updatedUser] = await connection('User')
					.where(user)
					.update({ first_name, last_name, email, password, status }, [
						'username',
						'first_name',
						'last_name',
						'email',
						'avatar_url',
						'status',
					]);
				return response.json(updatedUser);
			} catch (error) {
				return response.status(409).json({
					error: errors.UNIQUE_CONSTRAIN(error.detail),
				});
			}
		}
		//	Check if the avatar was uploaded and gets its location
		let avatar_url;
		let avatar_key;
		if (request.file) {
			avatar_url = request.file.location;
			avatar_key = request.file.key;
			const s3 = new aws.S3();
			if (user.avatar_key) {
				await s3
					.deleteObject({
						Bucket: process.env.AWS_FILES_BUCKET_NAME,
						Key: user.avatar_key,
					})
					.promise();
			}
		}
		let about;
		if (request.body.about) {
			about = request.body.about;
		}
		if (!about && !avatar_url) {
			const [userNotUpdated] = await connection('User')
				.select([
					'username',
					'first_name',
					'last_name',
					'email',
					'avatar_url',
					'status',
				])
				.where(user);
			return response.json(userNotUpdated);
		}
		try {
			const [updatedUser] = await connection('User')
				.where(user)
				.update({ avatar_url, avatar_key, about }, [
					'username',
					'first_name',
					'last_name',
					'email',
					'avatar_url',
					'status',
					'about',
				]);
			return response.json(updatedUser);
		} catch (error) {
			return response.status(409).json({
				error: errors.UNIQUE_CONSTRAIN(error.detail),
			});
		}
	}

	async remove(request, response, next) {
		//	Finding the User
		const user = await this.findUser(request, response, next);
		if (!user) return next();

		// Deleting the user
		await connection('User').where(user).del();

		return response.status(204).send();
	}

	async findUser(request, response, next) {
		const { username } = request.params;
		const [user] = await connection('User')
			.select('id', 'avatar_key')
			.where({ username });
		if (!user) return next(errors.USER_NOT_FOUND(username, 'params'));
		return user;
	}
}

module.exports = new UserController();
