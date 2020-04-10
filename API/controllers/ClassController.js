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

	async findStudents(request, response, next) {
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
			.select('id')
			.where({ number: class_number, academic_year: year });
		if (!class_) return next(errors.CLASS_NOT_FOUND());
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
			.where('class_student.class_id', class_.id);
		return response.json(students);
	}

	async storeStudents(request, response, next) {
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
			.select('id')
			.where({ number: class_number, academic_year: year });
		if (!class_) return next(errors.CLASS_NOT_FOUND());
		const createdStudents = [];
		for (let student of request.body.students) {
			try {
				const { username } = student;
				const [createdStudent] = await connection('class_student').insert(
					{
						student_username: username,
						class_id: class_.id,
					},
					['student_username']
				);
				createdStudents.push(createdStudent);
			} catch (error) {
				console.log(error);
				return response.status(409).json({
					error: errors.UNIQUE_CONSTRAIN(error),
					created: createdStudents,
				});
			}
			return response.status(201).json(createdStudents);
		}
	}

	async removeStudent(request, response, next) {
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
			.select('id')
			.where({ number: class_number, academic_year: year });
		if (!class_) return next(errors.CLASS_NOT_FOUND());
		const { student_username } = request.params;
		const [student] = await connection('class_student')
			.select('student_username')
			.where({ student_username });
		if (!student) return next(errors.STUDENT_NOT_FOUND());
		await connection('class_student').where(student).del();
		return response.status(204).send();
	}

	async findProfessors(request, response, next) {
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
			.select('id')
			.where({ number: class_number, academic_year: year });
		if (!class_) return next(errors.CLASS_NOT_FOUND());
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
			.where('class_professor.class_id', class_.id);
		return response.json(professors);
	}

	async storeProfessors(request, response, next) {
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
			.select('id')
			.where({ number: class_number, academic_year: year });
		if (!class_) return next(errors.CLASS_NOT_FOUND());
		const createdProfessors = [];
		for (let professor of request.body.professors) {
			try {
				const { username } = professor;
				const [createdProfessor] = await connection('class_professor').insert(
					{
						professor_username: username,
						class_id: class_.id,
					},
					['professor_username']
				);
				createdProfessors.push(createdProfessor);
			} catch (error) {
				console.log(error);
				return response.status(409).json({
					error: errors.UNIQUE_CONSTRAIN(error),
					created: createdProfessors,
				});
			}
			return response.status(201).json(createdProfessors);
		}
	}

	async removeProfessor(request, response, next) {
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
			.select('id')
			.where({ number: class_number, academic_year: year });
		if (!class_) return next(errors.CLASS_NOT_FOUND());
		const { professor_username } = request.params;
		const [professor] = await connection('class_professor')
			.select('professor_username')
			.where({ professor_username });
		if (!professor) return next(errors.PROFESSOR_NOT_FOUND());
		await connection('class_professor').where(professor).del();
		return response.status(204).send();
	}
}

module.exports = new ClassController();
