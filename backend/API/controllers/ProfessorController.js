const connection = require('../db/config/connection');
const errors = require('../utils/errors');

class ProfessorController {
	constructor() {
		this.find = this.find.bind(this);
		this.modify = this.modify.bind(this);
		this.findClasses = this.findClasses.bind(this);
	}

	async index(request, response) {
		const professors = await connection('Professor')
			.join('User', 'User.id', '=', 'Professor.user_id')
			.select([
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.email',
				'User.status',
				'User.avatar_url',
				'Professor.room',
				'Professor.department',
			]);
		return response.json(professors);
	}

	async find(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [professor] = await connection('Professor')
			.join('User', 'User.id', '=', 'Professor.user_id')
			.select([
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.email',
				'Professor.room',
				'Professor.department',
			])
			.where('Professor.user_id', user.id);
		if (!professor)
			return next(errors.PROFESSOR_NOT_FOUND(user.username, 'params'));
		return response.json(professor);
	}

	async modify(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [professor] = await connection('Professor')
			.select('user_id')
			.where({ user_id: user.id });
		if (!professor)
			return next(errors.PROFESSOR_NOT_FOUND(user.username, 'params'));
		const { room, department } = request.body.professor;
		const [updatedProfessor] = await connection('Professor')
			.where(professor)
			.update(
				{
					room,
					department,
				},
				['room', 'department']
			);

		return response.json(updatedProfessor);
	}

	async findClasses(request, response, next) {
		const user = await this.findUser(request, response, next);
		const [professor] = await connection('Professor')
			.select('user_id')
			.where({ user_id: user.id });
		if (!professor)
			return next(errors.PROFESSOR_NOT_FOUND(user.username, 'params'));
		const { academic_year, semester } = request.params;

		const classes = await connection('Unit')
			.leftJoin('Class', 'Class.unit_id', '=', 'Unit.id')
			.leftJoin('class_professor', 'class_professor.class_id', '=', 'Class.id')
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
			.where({ professor_id: professor.user_id, academic_year, semester });
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
module.exports = new ProfessorController();
