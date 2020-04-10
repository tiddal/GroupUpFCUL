const connection = require('../db/config/connection');
const { v4: uuidv4 } = require('uuid');
const errors = require('../utils/errors');

class CourseController {
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
		if (!course) return next(errors.COURSE_NOT_FOUND());
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
					try {
						const [createdUnit] = await connection('units').insert(
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
						await connection('course_unit').insert({
							course_code: createdCourse.code,
							unit_code: createdUnit.code,
						});
						createdCourses[index].units.push(createdUnit);
					} catch (error) {
						return response.status(409).json({
							error: errors.UNIQUE_CONSTRAIN(error),
							created: createdCourses,
						});
					}
				}
			} catch (error) {
				return response.status(409).json({
					error: errors.UNIQUE_CONSTRAIN(error),
					created: createdCourses,
				});
			}
		}

		return response.status(201).json(createdCourses);
	}

	async modify(request, response, next) {
		//	Finding the Course
		const { code } = request.params;
		let { name, initials } = request.body.course;
		const [course] = await connection('courses')
			.select('code')
			.where('code', code);
		if (!course) return next(errors.COURSE_NOT_FOUND());

		//	Updating the Course
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
		//	Finding the course
		const { code } = request.params;
		const [course] = await connection('courses')
			.select('code')
			.where('code', code);
		if (!course) return next(errors.COURSE_NOT_FOUND());

		// Deleting the course
		await connection('courses').where(course).del();

		return response.status(204).send();
	}
}

module.exports = new CourseController();
