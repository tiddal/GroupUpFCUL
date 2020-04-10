const connection = require('../db/config/connection');
const crypto = require('crypto');
const errors = require('../utils/errors');

class ClassController {
	async index(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('courses')
			.select('code')
			.where('code', code);
		if (!course) return next(errors.COURSE_NOT_FOUND());
		const { unit_code } = request.params;
		const [unit] = await connection('units')
			.select('code')
			.where('code', unit_code);
		if (!unit) return next(errors.UNIT_NOT_FOUND());
		const classes = await connection('classes')
			.select(
				'unit_code',
				'number',
				'begins_at',
				'ends_at',
				'week_day',
				'academic_year'
			)
			.where('unit_code', unit.code);
		return response.json(classes);
	}

	async find(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('courses')
			.select('code')
			.where('code', code);
		if (!course) return next(errors.COURSE_NOT_FOUND());
		const { unit_code } = request.params;
		const [unit] = await connection('units')
			.select('code')
			.where('code', unit_code);
		if (!unit) return next(errors.UNIT_NOT_FOUND());
		const { class_number, year } = request.params;
		const [class_] = await connection('classes')
			.select(
				'unit_code',
				'number',
				'begins_at',
				'ends_at',
				'week_day',
				'academic_year'
			)
			.where({ number: class_number, academic_year: year });
		if (!class_) return next(errors.CLASS_NOT_FOUND());
		return response.json(class_);
	}

	async store(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('courses')
			.select('code')
			.where('code', code);
		if (!course) return next(errors.COURSE_NOT_FOUND());
		const { unit_code } = request.params;
		const [unit] = await connection('units')
			.select('code')
			.where('code', unit_code);
		if (!unit) return next(errors.UNIT_NOT_FOUND());
		const createdClasses = [];
		for (let class_ of request.body.classes) {
			try {
				const { number, begins_at, ends_at, week_day, academic_year } = class_;
				const id = crypto.randomBytes(4).toString('HEX');
				const createdClass = await connection('classes').insert(
					{
						id,
						unit_code: unit.code,
						number,
						begins_at,
						ends_at,
						week_day,
						academic_year,
					},
					[
						'id',
						'unit_code',
						'number',
						'begins_at',
						'ends_at',
						'week_day',
						'academic_year',
					]
				);
				createdClasses.push(createdClass);
			} catch (error) {
				return response.status(409).json({
					error: errors.UNIQUE_CONSTRAIN(error),
					created: createdClasses,
				});
			}
		}
		return response.status(201).json(createdClasses);
	}

	async modify(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('courses')
			.select('code')
			.where('code', code);
		if (!course) return next(errors.COURSE_NOT_FOUND());
		const { unit_code } = request.params;
		const [unit] = await connection('units')
			.select('code')
			.where('code', unit_code);
		if (!unit) return next(errors.UNIT_NOT_FOUND());
		const { class_number, year } = request.params;
		const [class_] = await connection('classes')
			.select('number', 'academic_year')
			.where({ number: class_number, academic_year: year });
		if (!class_) return next(errors.CLASS_NOT_FOUND());
		const {
			number,
			begins_at,
			ends_at,
			week_day,
			academic_year,
		} = request.body.class;
		const [updatedClass] = await connection('classes')
			.where(class_)
			.update({ number, begins_at, ends_at, week_day, academic_year }, [
				'unit_code',
				'number',
				'begins_at',
				'ends_at',
				'week_day',
				'academic_year',
			]);
		return response.json(updatedClass);
	}

	async remove(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('courses')
			.select('code')
			.where('code', code);
		if (!course) return next(errors.COURSE_NOT_FOUND());
		const { unit_code } = request.params;
		const [unit] = await connection('units')
			.select('code')
			.where('code', unit_code);
		if (!unit) return next(errors.UNIT_NOT_FOUND());
		const { class_number, year } = request.params;
		const [class_] = await connection('classes')
			.select('number', 'academic_year')
			.where({ number: class_number, academic_year: year });
		if (!class_) return next(errors.CLASS_NOT_FOUND());
		await connection('classes').where(class_).del();
		return response.status(204).send();
	}
}

module.exports = new ClassController();
