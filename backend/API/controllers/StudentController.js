const connection = require('../db/config/connection');
const errors = require('../utils/errors');

class StudentController {
	constructor() {
		this.find = this.find.bind(this);
		this.findClasses = this.findClasses.bind(this);
		this.modify = this.modify.bind(this);
	}

	async index(request, response) {
		const students = await connection('Student')
			.join('User', 'User.id', '=', 'Student.user_id')
			.leftJoin('team_ratings', 'team_ratings.member_rated_id', '=', 'User.id')
			.select(
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.email',
				'User.avatar_url',
				'User.about',
				'User.status',
				'Student.working_student',
				'Student.github_url',
				'Student.facebook_url',
				'Student.instagram_url',
				'Student.twitter_url',
				connection.raw(
					'COUNT(rate) OVER (PARTITION BY User) AS number_of_ratings'
				),
				connection.raw(
					'ROUND(AVG(rate) OVER (PARTITION BY User), 2)  AS rating'
				)
			)
			.orderBy('User.username');
		return response.json(students);
	}

	async find(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [student] = await connection('Student')
			.join('User', 'User.id', '=', 'Student.user_id')
			.leftJoin('team_ratings', 'team_ratings.member_rated_id', '=', 'User.id')
			.select(
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.email',
				'User.avatar_url',
				'User.about',
				'User.status',
				'Student.working_student',
				'Student.github_url',
				'Student.facebook_url',
				'Student.instagram_url',
				'Student.twitter_url',
				connection.raw(
					'COUNT(rate) OVER (PARTITION BY User) AS number_of_ratings'
				),
				connection.raw(
					'ROUND(AVG(rate) OVER (PARTITION BY User), 2)  AS rating'
				)
			)
			.where({ user_id: user.id });
		if (!student)
			return next(errors.STUDENT_NOT_FOUND(user.username, 'params'));
		return response.json(student);
	}

	async modify(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [student] = await connection('Student')
			.select('user_id', 'working_student')
			.where({ user_id: user.id });
		if (!student)
			return next(errors.STUDENT_NOT_FOUND(user.username, 'params'));
		const { github, facebook, instagram, twitter } = request.body.student;

		const [updatedStudent] = await connection('Student')
			.where(student)
			.update(
				{
					working_student: student.working_student,
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

	async findClasses(request, response, next) {
		const user = await this.findUser(request, response, next);
		const [student] = await connection('Student')
			.select('user_id')
			.where({ user_id: user.id });
		if (!student)
			return next(errors.STUDENT_NOT_FOUND(user.username, 'params'));
		const { academic_year, semester } = request.params;

		const classes = await connection('Unit')
			.leftJoin('Class', 'Class.unit_id', '=', 'Unit.id')
			.leftJoin('class_student', 'class_student.class_id', '=', 'Class.id')
			.leftJoin('course_unit', 'course_unit.unit_id', '=', 'Unit.id')
			.leftJoin('Course', 'Course.id', '=', 'course_unit.course_id')
			.select(
				'Class.number',
				'Class.begins_at',
				'Class.ends_at',
				'Class.week_day',
				'Class.academic_year',
				'Unit.code',
				'Unit.name',
				'Unit.initials',
				'Unit.semester',
				'Unit.ects',
				'Course.code as course_code',
				'Course.name as course_name',
				'Course.initials as course_initials'
			)
			.where({ student_id: student.user_id, academic_year, semester });
		return response.json(classes);
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
