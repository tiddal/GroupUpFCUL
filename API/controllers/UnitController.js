const connection = require('../db/config/connection');
const { v4: uuidv4 } = require('uuid');
const errors = require('../utils/errors');

class UnitController {
	constructor() {
		this.index = this.index.bind(this);
		this.find = this.find.bind(this);
		this.store = this.store.bind(this);
		this.modify = this.modify.bind(this);
		this.remove = this.remove.bind(this);
		this.findUnit = this.findUnit.bind(this);
		this.findCourse = this.findCourse.bind(this);
	}

	async index(request, response, next) {
		const { code } = await this.findCourse(request, response, next);
		const units = await connection('course_unit')
			.join('units', 'units.code', '=', 'course_unit.unit_code')
			.select([
				'course_unit.*',
				'units.name',
				'units.semester',
				'units.initials',
				'units.ects',
			])
			.where('course_unit.course_code', code);
		return response.json(units);
	}

	async find(request, response, next) {
		const { code } = await this.findCourse(request, response, next);
		const { unit_code } = request.params;
		const [unit] = await connection('course_unit')
			.join('units', 'units.code', '=', 'course_unit.unit_code')
			.select([
				'course_unit.*',
				'units.name',
				'units.semester',
				'units.initials',
				'units.ects',
			])
			.where({
				'course_unit.course_code': code,
				'course_unit.unit_code': unit_code,
			});
		if (!unit) return next(errors.UNIT_NOT_FOUND(unit_code, 'params'));
		return response.json(unit);
	}

	async store(request, response, next) {
		const course = await this.findCourse(request, response, next);
		const createdUnits = [];
		for (let unit of request.body.units) {
			try {
				const { code, name, semester, initials, ects } = unit;
				const id = uuidv4();
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
					course_code: course.code,
					unit_code: createdUnit.code,
				});
				createdUnits.push(createdUnit);
			} catch (error) {
				return response.status(409).json({
					error: errors.UNIQUE_CONSTRAIN(error.detail),
					created: createdUnits,
				});
			}
		}
		return response.json(createdUnits);
	}

	async modify(request, response, next) {
		const unit = this.findUnit(request, response, next);
		const { name, semester, initials, ects } = request.body.unit;
		const [updatedUnit] = await connection('units')
			.where(unit)
			.update({ name, semester, initials, ects }, [
				'code',
				'name',
				'semester',
				'initials',
				'ects',
			]);
		return response.json(updatedUnit);
	}

	async remove(request, response, next) {
		const unit = this.findUnit(request, response, next);
		await connection('units').where(unit).del();
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

	async findUnit(request, response, next) {
		await this.findCourse(request, response, next);
		const { unit_code } = request.params;
		const [unit] = await connection('units')
			.select('code')
			.where('code', unit_code);
		if (!unit) return next(errors.UNIT_NOT_FOUND(unit_code, 'params'));
		return unit;
	}
}

module.exports = new UnitController();
