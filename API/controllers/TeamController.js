const connection = require('../db/config/connection');
const errors = require('../utils/errors');
const { v4: uuidv4 } = require('uuid');

class TeamController {
	constructor() {
		this.index = this.index.bind(this);
		this.store = this.store.bind(this);
		this.find = this.find.bind(this);
		this.modify = this.modify.bind(this);
		this.remove = this.remove.bind(this);

		this.findTeam = this.findTeam.bind(this);
		this.findProject = this.findProject.bind(this);
		this.findUnit = this.findUnit.bind(this);
	}

	async index(request, response, next) {
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		const teams = await connection('Team').select([
			'team_number',
			'name',
			'description',
			'academic_year',
		]);
		return response.json(teams);
	}

	async find(request, response, next) {
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		const { team_number } = request.params;
		const [team] = await connection('Team')
			.select(['team_number', 'name', 'description', 'academic_year'])
			.where({ team_number, project_id: project.id });
		if (!team) return next(errors.TEAM_NOT_FOUND(team_number, 'params'));
		return response.json(team_number);
	}

	async store(request, response, next) {
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		let team_number = 'T001';
		const { name, description, logo_url } = request.body.team;
		const id = uuidv4();
		const { id: project_id, academic_year } = project;
		const [existentTeam] = await connection('Team')
			.select('team_number')
			.where({ project_id })
			.orderBy('team_number', 'desc')
			.limit(1);
		if (existentTeam)
			team_number =
				'T' +
				('00' + `${parseInt(existentTeam.team_number.slice(1)) + 1}`).slice(-3);
		try {
			const [team] = await connection('Team').insert(
				{
					id,
					project_id,
					team_number,
					name,
					description,
					logo_url,
					academic_year,
				},
				['team_number', 'name', 'description', 'logo_url', 'academic_year']
			);
			return response.status(201).json(team);
		} catch (error) {
			return next(errors.UNIQUE_CONSTRAIN(error.detail));
		}
	}

	async modify(request, response, next) {
		const team = await this.findTeam(request, response, next);
		if (!team) return next();
		const { name, description, logo_url } = request.body.team;
		const [updatedTeam] = await connection('Team')
			.where(team)
			.update({ name, description, logo_url }, [
				'team_number',
				'name',
				'description',
				'logo_url',
				'academic_year',
			]);
		return response.json(updatedTeam);
	}

	async remove(request, response, next) {
		const team = await this.findTeam(request, response, next);
		if (!team) return next();
		await connection('Team').where(team).del();
		return response.status(204).send();
	}

	async findCourse(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('Course').select('id').where({ code });
		if (!course) return next(errors.COURSE_NOT_FOUND(code, 'params'));
		return course;
	}

	async findUnit(request, response, next) {
		const course = await this.findCourse(request, response, next);
		if (!course) return next();
		const { unit_code } = request.params;
		const [unit] = await connection('course_unit')
			.join('Unit', 'Unit.id', '=', 'course_unit.unit_id')
			.select('Unit.id')
			.where({
				'course_unit.course_id': course.id,
				'Unit.code': unit_code,
			});
		if (!unit) return next(errors.UNIT_NOT_FOUND(unit_code, 'params'));
		return unit;
	}

	async findProject(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const {
			project_year: academic_year,
			project_number: number,
		} = request.params;
		const [project] = await connection('Project')
			.select('id', 'academic_year')
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

module.exports = new TeamController();
