const connection = require('../db/config/connection');
const errors = require('../utils/errors');
const { v4: uuidv4 } = require('uuid');

class StageController {
	constructor() {
		this.index = this.index.bind(this);
		this.store = this.store.bind(this);
		this.find = this.find.bind(this);
		this.modify = this.modify.bind(this);
		this.remove = this.remove.bind(this);
		this.storeTeam = this.storeTeam.bind(this);
		this.findTeams = this.findTeams.bind(this);
		this.findStage = this.findStage.bind(this);
		this.findTeam = this.findTeam.bind(this);
		this.modifyTeamStage = this.modifyTeamStage.bind(this);
	}

	async index(request, response, next) {
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		const stages = await connection('Stage')
			.select([
				'stage_number',
				'description',
				'start_date',
				'end_date',
				'weight',
			])
			.where({ project_id: project.id });

		return response.json(stages);
	}

	async store(request, response, next) {
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		let stage_number = 1;
		const { description, start_date, end_date, weight } = request.body.stage;
		const id = uuidv4();
		const { id: project_id } = project;
		const [existentStage] = await connection('Stage')
			.select('stage_number')
			.where({ project_id })
			.orderBy('stage_number', 'desc')
			.limit(1);

		if (existentStage) stage_number = existentStage.stage_number + 1;
		try {
			const [stage] = await connection('Stage').insert(
				{
					id,
					project_id,
					stage_number,
					description,
					start_date,
					end_date,
					weight,
				},
				['stage_number', 'description', 'start_date', 'end_date', 'weight']
			);
			return response.status(201).json(stage);
		} catch (error) {
			return next(errors.UNIQUE_CONSTRAIN(error.detail));
		}
	}

	async find(request, response, next) {
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		const { stage_number } = request.params;
		const [stage] = await connection('Stage')
			.select([
				'stage_number',
				'description',
				'start_date',
				'end_date',
				'weight',
			])
			.where({ stage_number, project_id: project.id });
		if (!stage) return next(errors.STAGE_NOT_FOUND(stage_number, 'params'));
		return response.json(stage);
	}

	async modify(request, response, next) {
		const stage = await this.findStage(request, response, next);
		if (!stage) return next();
		const { description, end_date, weight } = request.body.stage;
		const [updatedStage] = await connection('Stage')
			.where(stage)
			.update({ description, end_date, weight }, [
				'stage_number',
				'description',
				'start_date',
				'end_date',
				'weight',
			]);
		return response.json(updatedStage);
	}

	async remove(request, response, next) {
		const stage = await this.findStage(request, response, next);
		if (!stage) return next();
		await connection('Stage').where(stage).del();
		return response.status(204).send();
	}

	async storeTeam(request, response, next) {
		const stage = await this.findStage(request, response, next);
		if (!stage) return next();
		const submitted_at = new Date();
		const { team_number, submission_url } = request.body;
		const [team] = await connection('Team')
			.select('id')
			.where({ team_number, project_id: stage.project_id });
		if (!team) return next(errors.TEAM_NOT_FOUND(team_number, 'body'));
		try {
			const [team_stage] = await connection('team_stage').insert(
				{
					stage_id: stage.id,
					team_id: team.id,
					submission_url,
					submitted_at,
				},
				['submitted_at']
			);
			return response.status(201).json(team_stage);
		} catch (error) {
			return next(errors.UNIQUE_CONSTRAIN(error.detail));
		}
	}

	async findTeams(request, response, next) {
		const stage = await this.findStage(request, response, next);
		if (!stage) return next();
		const teams = await connection('team_stage')
			.join('Team', 'Team.id', '=', 'team_stage.team_id')
			.select([
				'Team.team_number',
				'Team.name',
				'Team.description',
				'Team.logo_url',
				'team_stage.stage_grade',
				'team_stage.stage_feedback',
				'team_stage.submission_url',
				'team_stage.submitted_at',
			])
			.where({ stage_id: stage.id });

		return response.json(teams);
	}

	async findTeam(request, response, next) {
		const stage = await this.findStage(request, response, next);
		if (!stage) return next();
		const { team_number } = request.params;
		const [team] = await connection('Team')
			.select('id')
			.where({ team_number, project_id: stage.project_id });
		if (!team) return next(errors.TEAM_NOT_FOUND(team_number, 'params'));
		const [team_stage] = await connection('team_stage')
			.join('Team', 'Team.id', '=', 'team_stage.team_id')
			.select([
				'Team.team_number',
				'Team.name',
				'Team.description',
				'Team.logo_url',
				'team_stage.stage_grade',
				'team_stage.stage_feedback',
				'team_stage.submission_url',
				'team_stage.submitted_at',
			])
			.where({ stage_id: stage.id, team_id: team.id });
		if (!team_stage) return next(errors.TEAM_NOT_FOUND(team_number, 'params'));
		return response.json(team_stage);
	}

	async modifyTeamStage(request, response, next) {
		const stage = await this.findStage(request, response, next);
		if (!stage) return next();
		const { team_number } = request.params;
		const [team] = await connection('Team')
			.select('id')
			.where({ team_number, project_id: stage.project_id });
		if (!team) return next(errors.TEAM_NOT_FOUND(team_number, 'params'));
		const {
			stage_grade,
			stage_feedback,
			submission_url,
			submitted_at,
		} = request.body;
		const [updatedStage] = await connection('team_stage')
			.where({ team_id: team.id, stage_id: stage.id })
			.update({ stage_grade, stage_feedback, submission_url, submitted_at }, [
				'stage_grade',
				'stage_feedback',
				'submission_url',
				'submitted_at',
			]);
		return response.json(updatedStage);
	}

	// GET /courses/L079/units/26719/projects/2019-2020/1/stages
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
			.select('id')
			.where({ academic_year, number, unit_id: unit.id });
		if (!project)
			return next(errors.PROJECT_NOT_FOUND(academic_year, number, 'params'));
		return project;
	}

	async findStage(request, response, next) {
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		const { stage_number } = request.params;
		const [stage] = await connection('Stage')
			.select('id', 'project_id')
			.where({ stage_number, project_id: project.id });
		if (!stage) return next(errors.STAGE_NOT_FOUND(stage_number, 'params'));
		return stage;
	}
}

module.exports = new StageController();
