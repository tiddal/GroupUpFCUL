const connection = require('../db/config/connection');
const crypto = require('crypto');
const errors = require('../utils/errors');

class ClassController {
	constructor() {
		this.index = this.index.bind(this);
		this.find = this.find.bind(this);
		this.store = this.store.bind(this);
		this.modify = this.modify.bind(this);
		this.remove = this.remove.bind(this);
		this.findStudents = this.findStudents.bind(this);
		this.storeStudents = this.storeStudents.bind(this);
		this.removeStudent = this.removeStudent.bind(this);
		this.findProfessors = this.findProfessors.bind(this);
		this.storeProfessors = this.storeProfessors.bind(this);
		this.removeProfessor = this.removeProfessor.bind(this);
		this.findClass = this.findClass.bind(this);
		this.findUnit = this.findUnit.bind(this);
	}

	async index(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
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
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
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
		if (!class_)
			return next(errors.CLASS_NOT_FOUND(class_number, year, 'params'));
		return response.json(class_);
	}

	async store(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const createdClasses = [];
		for (let class_ of request.body.classes) {
			try {
				const { number, begins_at, ends_at, week_day, academic_year } = class_;
				const id = crypto.randomBytes(4).toString('HEX');
				const [createdClass] = await connection('classes').insert(
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
					error: errors.UNIQUE_CONSTRAIN(error.detail),
					created: createdClasses,
				});
			}
		}
		return response.status(201).json(createdClasses);
	}

	async modify(request, response, next) {
		const class_ = await this.findClass(request, response, next);
		if (!class_) return next();
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
		const class_ = await this.findClass(request, response, next);
		if (!class_) return next();
		await connection('classes').where(class_).del();
		return response.status(204).send();
	}

	async findStudents(request, response, next) {
		const class_ = await this.findClass(request, response, next);
		if (!class_) return next();
		const { id: class_id } = class_;
		const students = await connection('class_student')
			.join('users', 'users.username', '=', 'class_student.student_username')
			.select([
				'class_student.student_username',
				'users.first_name',
				'users.last_name',
				'users.email',
				'users.avatar_url',
				'users.status',
			])
			.where('class_student.class_id', class_id);
		return response.json(students);
	}

	async storeStudents(request, response, next) {
		const class_ = await this.findClass(request, response, next);
		if (!class_) return next();
		const { id: class_id } = class_;
		const createdStudents = [];
		for (let student of request.body.students) {
			const { username } = student;
			try {
				const [createdStudent] = await connection('class_student').insert(
					{
						student_username: username,
						class_id,
					},
					['student_username']
				);
				createdStudents.push(createdStudent);
			} catch (error) {
				if (error.code === '23503')
					return response.status(404).json({
						error: errors.STUDENT_NOT_FOUND(username, 'body'),
					});
				return response.status(409).json({
					error: errors.UNIQUE_CONSTRAIN(error.detail),
					created: createdStudents,
				});
			}
			return response.status(201).json(createdStudents);
		}
	}

	async removeStudent(request, response, next) {
		const class_ = await this.findClass(request, response, next);
		if (!class_) return next();
		const { id: class_id } = class_;
		const { student_username } = request.params;
		const [student] = await connection('class_student')
			.select('student_username')
			.where({ student_username, class_id });
		if (!student)
			return next(errors.STUDENT_NOT_FOUND(student_username, 'params'));
		await connection('class_student').where(student).del();
		return response.status(204).send();
	}

	async findProfessors(request, response, next) {
		const class_ = await this.findClass(request, response, next);
		if (!class_) return next();
		const { id: class_id } = class_;
		const professors = await connection('class_professor')
			.join(
				'users',
				'users.username',
				'=',
				'class_professor.professor_username'
			)
			.select([
				'class_professor.professor_username',
				'users.first_name',
				'users.last_name',
				'users.email',
				'users.avatar_url',
				'users.status',
			])
			.where('class_professor.class_id', class_id);
		return response.json(professors);
	}

	async storeProfessors(request, response, next) {
		const class_ = await this.findClass(request, response, next);
		if (!class_) return next();
		const { id: class_id } = class_;
		const createdProfessors = [];
		for (let professor of request.body.professors) {
			const { username } = professor;
			try {
				const [createdProfessor] = await connection('class_professor').insert(
					{
						professor_username: username,
						class_id,
					},
					['professor_username']
				);
				createdProfessors.push(createdProfessor);
			} catch (error) {
				if (error.code === '23503')
					return response.status(404).json({
						error: errors.PROFESSOR_NOT_FOUND(username, 'body'),
					});
				return response.status(409).json({
					error: errors.UNIQUE_CONSTRAIN(error.detail),
					created: createdProfessors,
				});
			}
			return response.status(201).json(createdProfessors);
		}
	}

	async removeProfessor(request, response, next) {
		const class_ = await this.findClass(request, response, next);
		if (!class_) return next();
		const { id: class_id } = class_;
		const { professor_username } = request.params;
		const [professor] = await connection('class_professor')
			.select('professor_username')
			.where({ professor_username, class_id });
		if (!professor)
			return next(errors.PROFESSOR_NOT_FOUND(professor_username, 'params'));
		await connection('class_professor').where(professor).del();
		return response.status(204).send();
	}

	async findUnit(request, response, next) {
		const { code } = request.params;
		const [course] = await connection('courses')
			.select('code')
			.where('code', code);
		if (!course) return next(errors.COURSE_NOT_FOUND(code, 'params'));
		const { unit_code } = request.params;
		const [unit] = await connection('units')
			.select('code')
			.where('code', unit_code);
		if (!unit) return next(errors.UNIT_NOT_FOUND(unit_code, 'params'));
		return unit;
	}

	async findClass(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const { class_number, year } = request.params;
		const [class_] = await connection('classes')
			.select('id', 'number', 'academic_year')
			.where({ number: class_number, academic_year: year });
		if (!class_)
			return next(errors.CLASS_NOT_FOUND(class_number, year, 'params'));
		return class_;
	}
}

module.exports = new ClassController();
