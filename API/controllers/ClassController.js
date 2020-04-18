const connection = require('../db/config/connection');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
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
		this.findStudentByUsername = this.findStudentByUsername.bind(this);
		this.findProfessorByUsername = this.findProfessorByUsername.bind(this);
	}

	async index(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const classes = await connection('Class')
			.select('number', 'begins_at', 'ends_at', 'week_day', 'academic_year')
			.where('unit_id', unit.id);
		return response.json(classes);
	}

	async find(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const { class_number, year } = request.params;
		const [class_] = await connection('Class')
			.select('number', 'begins_at', 'ends_at', 'week_day', 'academic_year')
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
				const id = uuidv4();
				const [createdClass] = await connection('Class').insert(
					{
						id,
						unit_id: unit.id,
						number,
						begins_at,
						ends_at,
						week_day,
						academic_year,
					},
					['number', 'begins_at', 'ends_at', 'week_day', 'academic_year']
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
		const [updatedClass] = await connection('Class')
			.where(class_)
			.update({ number, begins_at, ends_at, week_day, academic_year }, [
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
		await connection('Class').where(class_).del();
		return response.status(204).send();
	}

	async findStudents(request, response, next) {
		const class_ = await this.findClass(request, response, next);
		if (!class_) return next();
		const { id: class_id } = class_;
		const students = await connection('class_student')
			.join('User', 'User.id', '=', 'class_student.student_id')
			.select([
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.email',
				'User.avatar_url',
				'User.status',
			])
			.where({ class_id });
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
				request.params.student_username = username;
				student = await this.findStudentByUsername(request, response, next);
				if (!student) return next();
				await connection('class_student').insert({
					student_id: student.id,
					class_id,
				});
				createdStudents.push({ username: student.username });
			} catch (error) {
				if (error.code === '23503')
					return response.status(404).json({
						error: errors.STUDENT_NOT_FOUND(username, 'body'),
						created: createdStudents,
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
		const student = await this.findStudentByUsername(request, response, next);
		const { id: class_id } = class_;
		if (!student) return next();
		await connection('class_student')
			.where({ student_id: student.id, class_id })
			.del();
		return response.status(204).send();
	}

	async findProfessors(request, response, next) {
		const class_ = await this.findClass(request, response, next);
		if (!class_) return next();
		const { id: class_id } = class_;
		const professors = await connection('class_professor')
			.join('User', 'User.id', '=', 'class_professor.professor_id')
			.select([
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.email',
				'User.avatar_url',
				'User.status',
			])
			.where({ class_id });
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
				request.params.professor_username = username;
				professor = await this.findProfessorByUsername(request, response, next);
				if (!professor) return next();
				await connection('class_professor').insert({
					professor_id: professor.id,
					class_id,
				});
				createdProfessors.push({ username: professor.username });
			} catch (error) {
				if (error.code === '23503')
					return response.status(404).json({
						error: errors.PROFESSOR_NOT_FOUND(username, 'body'),
						created: createdProfessors,
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
		const professor = await this.findProfessorByUsername(
			request,
			response,
			next
		);
		const { id: class_id } = class_;
		if (!professor) return next();
		await connection('class_professor')
			.where({ professor_id: professor.id, class_id })
			.del();
		return response.status(204).send();
	}

	async findUnit(request, response, next) {
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
		return unit;
	}

	async findClass(request, response, next) {
		const unit = await this.findUnit(request, response, next);
		if (!unit) return next();
		const { class_number, year } = request.params;
		const [class_] = await connection('Class')
			.select('id')
			.where({ number: class_number, academic_year: year, unit_id: unit.id });
		if (!class_)
			return next(errors.CLASS_NOT_FOUND(class_number, year, 'params'));
		return class_;
	}

	async findStudentByUsername(request, response, next) {
		const { student_username } = request.params;
		const [student] = await connection('Student')
			.join('User', 'User.id', '=', 'Student.user_id')
			.select(['User.id', 'User.username'])
			.where('User.username', student_username);
		if (!student)
			return next(errors.STUDENT_NOT_FOUND(student_username, 'params'));
		return student;
	}

	async findProfessorByUsername(request, response, next) {
		const { professor_username } = request.params;
		const [professor] = await connection('Professor')
			.join('User', 'User.id', '=', 'Professor.user_id')
			.select(['User.id', 'User.username'])
			.where('User.username', professor_username);
		if (!professor)
			return next(errors.PROFESSOR_NOT_FOUND(professor_username, 'params'));
		return professor;
	}
}

module.exports = new ClassController();
