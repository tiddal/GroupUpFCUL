const connection = require('../db/config/connection');
const errors = require('../utils/errors');

class StudentController {
	async index(request, response) {
		const students = await connection('students')
			.join('users', 'users.username', '=', 'students.username')
			.select([
				'students.*',
				'users.first_name',
				'users.last_name',
				'users.email',
			]);
		return response.json(students);
	}

	async find(request, response, next) {
		const { username } = request.params;
		const [student] = await connection('students')
			.join('users', 'users.username', '=', 'students.username')
			.select([
				'students.*',
				'users.first_name',
				'users.last_name',
				'users.email',
			])
			.where('students.username', username);
		if (!student) return next(errors.STUDENT_NOT_FOUND(username, 'params'));
		return response.json(student);
	}

	async modify(request, response, next) {
		const { username } = request.params;
		const [student] = await connection('students')
			.select('username')
			.where('username', username);
		if (!student) return next(errors.STUDENT_NOT_FOUND(username, 'params'));
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
				['*']
			);

		return response.json(updatedStudent);
	}
}

module.exports = new StudentController();
