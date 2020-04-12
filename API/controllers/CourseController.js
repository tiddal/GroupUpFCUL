const connection = require('../db/config/connection');
const { v4: uuidv4 } = require('uuid');
const errors = require('../utils/errors');

class CourseController {
	constructor() {
		this.index = this.index.bind(this);
		this.find = this.find.bind(this);
		this.store = this.store.bind(this);
		this.modify = this.modify.bind(this);
		this.remove = this.remove.bind(this);
		this.findCourse = this.findCourse.bind(this);
	}

	async index(request, response) {
		const courses = await connection('courses').select([
			'code',
			'name',
			'cycle',
			'initials',
		]);
		return response.json(courses);
	}

	async find(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('courses')
			.select(['code', 'name', 'cycle', 'initials'])
			.where('code', code);
		if (!course) return next(errors.COURSE_NOT_FOUND(code, 'params'));
		return response.json(course);
	}

	async store(request, response) {
		const createdCourses = [];

		for (let [index, course] of request.body.courses.entries()) {
			const { code, name, cycle, initials, units } = course;
			const id = uuidv4();
			try {
				const [createdCourse] = await connection('courses').insert(
					{
						id,
						code,
						name,
						cycle,
						initials,
					},
					['code', 'name']
				);
				createdCourses.push({ ...createdCourse, units: [] });
				for (let unit of units) {
					const { code, name, semester, initials, ects } = unit;
					const id = uuidv4();
					let [courseUnit] = await connection('units')
						.select('code')
						.where('code', code);
					if (!courseUnit) {
						[courseUnit] = await connection('units').insert(
							{
								id,
								code,
								name,
								semester,
								initials,
								ects,
							},
							['code', 'name']
						);
					}
					await connection('course_unit').insert({
						course_code: createdCourse.code,
						unit_code: courseUnit.code,
					});
					createdCourses[index].units.push(courseUnit);
				}
			} catch (error) {
				return response.status(409).json({
					error: errors.UNIQUE_CONSTRAIN(error.detail),
					created: createdCourses,
				});
			}
		}

		return response.status(201).json(createdCourses);
	}

	async modify(request, response, next) {
		const course = await this.findCourse(request, response, next);
		const { name, initials } = request.body.course;
		const [updatedCourse] = await connection('courses').where(course).update(
			{
				name,
				initials,
			},
			['code', 'name', 'cycle', 'initials']
		);
		return response.json(updatedCourse);
	}

	async remove(request, response, next) {
		const course = await this.findCourse(request, response, next);
		await connection('courses').where(course).del();
		return response.status(204).send();
	}

	async findCourse(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('courses')
			.select('code')
			.where('code', code);
		if (!course) return next(errors.COURSE_NOT_FOUND(code, 'params'));
		return course;
	}
}

module.exports = new CourseController();
