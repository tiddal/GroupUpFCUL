const connection = require('../db/config/connection');
const errors = require('../utils/errors');

class StudentController {
	constructor() {
		this.find = this.find.bind(this);
		this.modify = this.modify.bind(this);
	}

	async index(request, response) {
		const students = await connection('Student')
			.join('User', 'User.id', '=', 'Student.user_id')
			.select([
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.email',
				'User.avatar_url',
				'User.status',
				'Student.working_student',
				'Student.github_url',
				'Student.facebook_url',
				'Student.instagram_url',
				'Student.twitter_url',
			]);
		return response.json(students);
	}

	async find(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [student] = await connection('Student')
			.join('User', 'User.id', '=', 'Student.user_id')
			.select([
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.email',
				'Student.working_student',
				'Student.github_url',
				'Student.facebook_url',
				'Student.instagram_url',
				'Student.twitter_url',
			])
			.where({ user_id: user.id });
		if (!student)
			return next(errors.STUDENT_NOT_FOUND(user.username, 'params'));
		return response.json(student);
	}

	async modify(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [student] = await connection('Student')
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
		const [updatedStudent] = await connection('Student')
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
		const [user] = await connection('User')
			.select(['id', 'username'])
			.where({ username });
		if (!user) return next(errors.USER_NOT_FOUND(username, 'params'));
		return user;
	}
}

module.exports = new StudentController();
