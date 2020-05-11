const connection = require('../db/config/connection');
const errors = require('../utils/errors');
const { v4: uuidv4 } = require('uuid');

class ProjectController {
	constructor() {
		this.index = this.index.bind(this);
		this.store = this.store.bind(this);
		this.find = this.find.bind(this);
		this.findByAcademicYear = this.findByAcademicYear.bind(this);
		this.modify = this.modify.bind(this);
		this.remove = this.remove.bind(this);

		this.findCourse = this.findCourse.bind(this);
		this.findUnit = this.findUnit.bind(this);
	}

	async index(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const projects = await connection('Project')
			.select([
				'number',
				'name',
				'min_students',
				'max_students',
				'description',
				'objectives',
				'assignment_url',
				'academic_year',
			])
			.where('unit_id', unit.id);
		return response.json(projects);
	}

	async store(request, response, next) {
		const { id: professor_id } = request.user;
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const date = new Date();
		const academic_year =
			date.getMonth() > 7
				? `${date.getFullYear()}-${date.getFullYear() + 1}`
				: `${date.getFullYear() - 1}-${date.getFullYear()}`;
		const [class_] = await connection('Class')
			.join('class_professor', 'class_professor.class_id', '=', 'Class.id')
			.select('Class.id')
			.where({
				professor_id,
				unit_id: unit.id,
				academic_year,
			});
		if (!class_) return next(errors.INVALID_IDENTITY());

		let { min_students, max_students } = request.body.project;
		const {
			name,
			description,
			objectives,
			assignment_url,
		} = request.body.project;
		if (max_students < min_students) max_students = min_students;
		let number = 1;
		const unit_id = unit.id;
		const id = uuidv4();

		const [existentProject] = await connection('Project')
			.select('number')
			.where({ academic_year, unit_id })
			.orderBy('number', 'desc')
			.limit(1);
		if (existentProject) number = existentProject.number + 1;
		try {
			const [project] = await connection('Project').insert(
				{
					id,
					number,
					unit_id,
					name,
					academic_year,
					min_students,
					max_students,
					description,
					objectives,
					assignment_url,
				},
				['number', 'name', 'academic_year']
			);
			return response.status(201).json(project);
		} catch (error) {
			return next(errors.UNIQUE_CONSTRAIN(error.detail));
		}
	}

	async find(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const {
			project_year: academic_year,
			project_number: number,
		} = request.params;
		const [project] = await connection('Project')
			.select([
				'number',
				'name',
				'min_students',
				'max_students',
				'description',
				'objectives',
				'assignment_url',
				'academic_year',
			])
			.where({ academic_year, unit_id: unit.id, number });
		if (!project)
			return errors.PROJECT_NOT_FOUND(academic_year, number, 'params');
		return response.json(project);
	}

	async findByAcademicYear(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const { project_year: academic_year } = request.params;
		const projects = await connection('Project')
			.select([
				'name',
				'min_students',
				'max_students',
				'description',
				'objectives',
				'assignment_url',
				'academic_year',
			])
			.where({ academic_year, unit_id: unit.id });
		return response.json(projects);
	}

	async modify(request, response, next) {
		const { id: professor_id } = request.user;
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		const [class_] = await connection('Class')
			.join('class_professor', 'class_professor.class_id', '=', 'Class.id')
			.select('Class.id')
			.where({
				professor_id,
				unit_id: project.unit_id,
				academic_year: project.academic_year,
			});
		if (!class_) return next(errors.INVALID_IDENTITY());

		let { min_students, max_students } = request.body.project;
		if (max_students < min_students) max_students = min_students;
		const {
			name,
			description,
			objectives,
			assignment_url,
		} = request.body.project;
		const [updatedProject] = await connection('Project').where(project).update(
			{
				name,
				min_students,
				max_students,
				description,
				objectives,
				assignment_url,
			},
			[
				'number',
				'name',
				'min_students',
				'max_students',
				'description',
				'objectives',
				'assignment_url',
				'academic_year',
			]
		);

		return response.json(updatedProject);
	}

	async remove(request, response, next) {
		const { id: professor_id } = request.user;
		const project = await this.findProject(request, response, next);
		if (!project) return next();
		const [class_] = await connection('Class')
			.join('class_professor', 'class_professor.class_id', '=', 'Class.id')
			.select('Class.id')
			.where({
				professor_id,
				unit_id: project.unit_id,
				academic_year: project.academic_year,
			});
		if (!class_) return next(errors.INVALID_IDENTITY());
		await connection('Project').where(project).del();
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
			.select('id', 'unit_id', 'academic_year')
			.where({
				unit_id: unit.id,
				academic_year,
				number,
			});
		if (!project)
			return errors.PROJECT_NOT_FOUND(academic_year, number, 'params');
		return project;
	}
}

module.exports = new ProjectController();
