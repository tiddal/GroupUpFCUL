const connection = require('../db/config/connection');
const errors = require('../utils/errors');
const { v4: uuidv4 } = require('uuid');

class QuestionController {
	constructor() {
		this.index = this.index.bind(this);
		this.store = this.store.bind(this);

		this.findTeam = this.findTeam.bind(this);
		this.findProject = this.findProject.bind(this);
	}

	async index(request, response, next) {
		const team = await this.findTeam(request, response, next);
		if (!team) return next();
		const questions = await connection('Question')
			.join('User', 'User.id', 'Question.user_id')
			.where({ team_id: team.id })
			.select(
				'Question.message',
				'Question.role',
				'Question.created_at',
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.avatar_url'
			)
			.orderBy('Question.created_at');
		return response.json(questions);
	}

	async store(request, response, next) {
		const { id: user_id, role } = request.user;

		const team = await this.findTeam(request, response, next);
		if (!team) return next();

		if (role === 'student') {
			const [belongsToTeam] = await connection('team_student')
				.select('student_id')
				.where({
					student_id: user_id,
					team_id: team.id,
				});
			if (!belongsToTeam) return next(errors.INVALID_IDENTITY());
		}

		const { message } = request.body.question;
		const id = uuidv4();
		try {
			const [question] = await connection('Question').insert(
				{
					id,
					message,
					user_id,
					team_id: team.id,
					role,
				},
				['message', 'role', 'created_at']
			);
			return response.status(201).json(question);
		} catch (error) {
			return next(errors.UNIQUE_CONSTRAIN(error.detail));
		}
	}

	async findProject(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('Course').select('id').where({ code });
		if (!course) return next(errors.COURSE_NOT_FOUND(code, 'params'));
		const { unit_code } = request.params;
		const [unit] = await connection('course_unit')
			.join('Unit', 'Unit.id', '=', 'course_unit.unit_id')
			.select('Unit.id')
			.where({
				'course_unit.course_id': course.id,
				'Unit.code': unit_code,
			});
		if (!unit) return next(errors.UNIT_NOT_FOUND(unit_code, 'params'));
		const {
			project_year: academic_year,
			project_number: number,
		} = request.params;
		const [project] = await connection('Project')
			.select('id', 'academic_year', 'unit_id')
			.where({ academic_year, number, unit_id: unit.id });
		if (!project)
			return next(errors.PROJECT_NOT_FOUND(academic_year, number, 'params'));
		return project;
	}

	async findTeam(request, response, next) {
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		const { team_number } = request.params;
		const [team] = await connection('Team')
			.select('id')
			.where({ team_number, project_id: project.id });
		if (!team) return next(errors.TEAM_NOT_FOUND(team_number, 'params'));
		return team;
	}
}

module.exports = new QuestionController();
