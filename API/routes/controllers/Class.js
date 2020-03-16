const Class = require('../../db/models/Class');
const Program = require('../../db/models/Program');
const Course = require('../../db/models/Course');
const Professor = require('../../db/models/Professor');
const Student = require('../../db/models/Student');

const error = require('../../utils/errors');
const assert = require('assert');

module.exports = {
	selectAll: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findAll({ where: { courseId } })
							.then((classes) => res.json(classes))
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	selectById: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		const classId = req.params.classId;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findByPk(classId, {
							include: {
								association: 'professors',
								attributes: {
									exclude: ['id']
								},
								through: {
									attributes: []
								}
							}
						})
							.then((class_) => {
								if (!class_) return next(error.CLASS_NOT_FOUND());
								return res.json(class_);
							})
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	insert: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		try {
			assert(req.body.classes !== undefined);
		} catch (err) {
			return next(error.INVALID_JSON());
		}
		const classesJSON = req.body.classes.map((classJSON) => ({
			courseId,
			...classJSON
		}));

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.bulkCreate(classesJSON, { validate: true }).then(
							(classes) =>
								res
									.status(201)
									.json(classes)
									.catch((err) => next(error.DB_DOWN()))
						);
					})
					.catch((err) => {
						switch (err.name) {
							case 'AggregateError':
								return next(error.VALIDATION_FAILED(err['0'].errors.errors[0]));
							case 'SequelizeUniqueConstraintError':
								return next(error.UNIQUE_CONSTRAIN(err.errors[0]));
							default:
								return next(error.DB_DOWN());
						}
					});
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	edit: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		const classId = req.params.classId;

		try {
			assert(req.body.class !== undefined);
		} catch {
			return next(error.INVALID_JSON());
		}

		const { number, beginsAt, endsAt, weekDay, academicYear } = req.body.class;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findByPk(classId)
							.then((class_) => {
								if (!class_) return next(error.CLASS_NOT_FOUND());
								return class_
									.update({
										number,
										beginsAt,
										endsAt,
										weekDay,
										academicYear
									})
									.then((updatedClass) => res.json(updatedClass))
									.catch((err) => {
										switch (err.name) {
											case 'SequelizeValidationError':
												return next(error.VALIDATION_FAILED(err.errors[0]));
											case 'SequelizeUniqueConstraintError':
												return next(error.UNIQUE_CONSTRAIN(err.errors[0]));
											default:
												return next(error.DB_DOWN());
										}
									});
							})
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	delete: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		const classId = req.params.classId;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findByPk(classId)
							.then((class_) => {
								if (!class_) return next(error.CLASS_NOT_FOUND());
								return class_
									.destroy()
									.then(() => res.status(204).json())
									.catch((err) => error.DB_DOWN());
							})
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	//	PROFESSORS

	selectProfessors: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		const classId = req.params.classId;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findByPk(classId)
							.then((class_) => {
								if (!class_) return next(error.CLASS_NOT_FOUND());
								return class_.getProfessors().then((professors) => {
									return res.json(professors);
								});
							})
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	selectProfessorById: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		const classId = req.params.classId;
		const professorId = req.params.professorId;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findByPk(classId)
							.then((class_) => {
								if (!class_) return next(error.CLASS_NOT_FOUND());
								return class_
									.getProfessors({ where: { userId: professorId } })
									.then((professor) => {
										if (professor.length < 1)
											return next(error.PROFESSOR_NOT_FOUND());
										return res.json(professor);
									})
									.catch((err) => next(error.DB_DOWN()));
							})
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	insertProfessor: async (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		const classId = req.params.classId;

		try {
			assert(req.body.professors !== undefined);
		} catch (err) {
			return next(error.INVALID_JSON());
		}

		const professorsJSON = req.body.professors;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findByPk(classId)
							.then(async (class_) => {
								if (!class_) return next(error.CLASS_NOT_FOUND());
								const professors = [];
								for (professorJSON of professorsJSON) {
									const professor = await Professor.findOne({
										where: { userId: professorJSON.userId }
									});
									if (professor) professors.push(professor);
								}
								const results = await class_.addProfessor(professors);
								if (results === undefined)
									return res.json({
										message:
											"Nothing to create. Either the professor is already associated with this class or you didn't provide a valid user ID"
									});
								return res.status(201).json(results);
							})
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	removeProfessor: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		const classId = req.params.classId;
		const professorId = req.params.professorId;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findByPk(classId)
							.then((class_) => {
								if (!class_) return next(error.CLASS_NOT_FOUND());
								return class_
									.getProfessors({ where: { userId: professorId } })
									.then((professor) => {
										if (professor.length < 1)
											return next(error.PROFESSOR_NOT_FOUND());
										class_.removeProfessors(professor);
										return res.status(204).json();
									})
									.catch((err) => next(error.DB_DOWN()));
							})
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	//	STUDENTS

	selectStudents: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		const classId = req.params.classId;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findByPk(classId)
							.then((class_) => {
								if (!class_) return next(error.CLASS_NOT_FOUND());
								return class_.getStudents().then((students) => {
									return res.json(students);
								});
							})
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	selectStudentById: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		const classId = req.params.classId;
		const studentId = req.params.studentId;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findByPk(classId)
							.then((class_) => {
								if (!class_) return next(error.CLASS_NOT_FOUND());
								return class_
									.getStudents({ where: { userId: studentId } })
									.then((student) => {
										if (student.length < 1)
											return next(error.STUDENT_NOT_FOUND());
										return res.json(student);
									})
									.catch((err) => next(error.DB_DOWN()));
							})
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	insertStudent: async (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		const classId = req.params.classId;

		try {
			assert(req.body.students !== undefined);
		} catch (err) {
			return next(error.INVALID_JSON());
		}

		const studentsJSON = req.body.students;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findByPk(classId)
							.then(async (class_) => {
								if (!class_) return next(error.CLASS_NOT_FOUND());
								const students = [];
								for (studentJSON of studentsJSON) {
									const student = await Student.findOne({
										where: { userId: studentJSON.userId }
									});
									if (student) students.push(student);
								}
								const results = await class_.addStudent(students);
								if (results === undefined)
									return res.json({
										message:
											"Nothing to create. Either the student is already associated with this class or you didn't provide a valid user ID"
									});
								return res.json(results);
							})
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	removeStudent: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;
		const classId = req.params.classId;
		const studentId = req.params.studentId;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findByPk(courseId)
					.then((course) => {
						if (!course) return next(error.COURSE_NOT_FOUND());
						return Class.findByPk(classId)
							.then((class_) => {
								if (!class_) return next(error.CLASS_NOT_FOUND());
								return class_
									.getStudents({ where: { userId: studentId } })
									.then((student) => {
										if (student.length < 1)
											return next(error.STUDENT_NOT_FOUND());
										class_.removeStudents(student);
										return res.status(204).json();
									})
									.catch((err) => next(error.DB_DOWN()));
							})
							.catch((err) => next(error.DB_DOWN()));
					})
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	}
};
