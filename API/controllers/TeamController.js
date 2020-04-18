const connection = require('../db/config/connection');
const errors = require('../utils/errors');

class TeamController {
	constructor() {
		this.index = this.index.bind(this);

		this.findProject = this.findProject.bind(this);
		this.findUnit = this.findUnit.bind(this);
	}

	async index(request, response, next) {
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		const teams = await connection('teams').select([
			'team_number',
			'name',
			'description',
			'academic_year',
		]);
		return response.json(teams);
	}

	async find(request, response, next) {}

	async store(request, response, next) {}

	async modify(request, response, next) {}

	async remove(request, response, next) {}

	async findCourse(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('courses').select('code').where({ code });
		if (!course) return next(errors.COURSE_NOT_FOUND(code, 'params'));
		return course;
	}

	async findUnit(request, response, next) {
		const course = await this.findCourse(request, response, next);
		if (!course) return next();
		const { unit_code } = request.params;
		const [unit] = await connection('course_unit')
			.select('unit_code')
			.where({ course_code: course.code, unit_code });
		if (!unit) return next(errors.UNIT_NOT_FOUND(code, 'params'));
		return unit;
	}

	async findProject(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const {
			project_year: academic_year,
			project_number: number,
		} = request.params;
		const [project] = await connection('projects')
			.select('id')
			.where({ academic_year, number, unit_code: unit.unit_code });
		if (!project)
			return next(
				errors.PROJECT_NOT_FOUND(academic_year, number, unit.unit_code)
			);
		return project;
	}
}

module.exports = new TeamController();
