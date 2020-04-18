const connection = require('../db/config/connection');
const errors = require('../utils/errors');

class StudentController {
	constructor() {
		this.find = this.find.bind(this);
		this.modify = this.modify.bind(this);
	}

	async index(request, response) {
		const students = await connection('students')
			.join('users', 'users.id', '=', 'students.user_id')
			.select([
				'users.username',
				'users.first_name',
				'users.last_name',
				'users.email',
				'students.working_student',
				'students.github_url',
				'students.facebook_url',
				'students.instagram_url',
				'students.twitter_url',
			]);
		return response.json(students);
	}

	async find(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [student] = await connection('students')
			.join('users', 'users.id', '=', 'students.user_id')
			.select([
				'users.username',
				'users.first_name',
				'users.last_name',
				'users.email',
				'students.working_student',
				'students.github_url',
				'students.facebook_url',
				'students.instagram_url',
				'students.twitter_url',
			])
			.where({ user_id: user.id });
		if (!student)
			return next(errors.STUDENT_NOT_FOUND(user.username, 'params'));
		return response.json(student);
	}

	async modify(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [student] = await connection('students')
			.select('user_id')
			.where({ user_id: user.id });
		if (!student)
			return next(errors.STUDENT_NOT_FOUND(user.username, 'params'));
		const {
			working_student,
			github,
			facebook,
			instagram,
			twitter,
		} = request.body.student;
		const [updatedStudent] = await connection('students')
			.where(student)
			.update(
				{
					working_student,
					github_url: github ? `https://github.com/${github}` : undefined,
					facebook_url: facebook
						? `https://facebook.com/${facebook}`
						: undefined,
					instagram_url: instagram
						? `https://instagram.com/${instagram}`
						: undefined,
					twitter_url: twitter ? `https://twitter.com/${twitter}` : undefined,
				},
				[
					'working_student',
					'github_url',
					'facebook_url',
					'instagram_url',
					'twitter_url',
				]
			);

		return response.json(updatedStudent);
	}

	async findUser(request, response, next) {
		const { username } = request.params;
		const [user] = await connection('users')
			.select(['id', 'username'])
			.where({ username });
		if (!user) return next(errors.USER_NOT_FOUND(username, 'params'));
		return user;
	}
}

module.exports = new StudentController();
