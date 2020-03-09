const Program = require('../../db/models/Program');
const Course = require('../../db/models/Course');

const assert = require('assert');
const error = require('../../utils/errors');

module.exports = {
	selectAllByProgram: (req, res, next) => {
		const programId = req.params.id;

		Program.findByPk(programId, {
			include: {
				association: 'courses',
				through: {
					attributes: []
				}
			}
		})
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return res.json(program.courses);
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	selectAll: (req, res, next) => {
		Course.findAll()
			.then((courses) => res.json(courses))
			.catch((err) => next(error.DB_DOWN()));
	},

	selectByIdByProgram: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;

		Program.findByPk(programId, {
			include: {
				association: 'courses',
				through: {
					where: { courseId },
					attributes: []
				}
			}
		})
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return program.courses[0]
					? res.json(program.courses[0])
					: next(error.COURSE_NOT_FOUND());
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	selectById: (req, res, next) => {
		Course.findByPk(req.params.id)
			.then((course) =>
				course ? res.json(course) : next(error.COURSE_NOT_FOUND())
			)
			.catch((err) => next(error.DB_DOWN()));
	},

	insert: (req, res, next) => {
		const programId = req.params.id;
		try {
			assert(req.body.course !== undefined);
			assert(req.body.course.code !== undefined);
		} catch (err) {
			return next(error.INVALID_JSON());
		}

		const { name, code, initials, ects } = req.body.course;

		Program.findByPk(programId)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				return Course.findOrCreate({
					where: { code },
					defaults: { code, name, initials, ects }
				})
					.then(([course, created]) => {
						return program
							.addCourse(course)
							.then(() => res.status(201).json(course));
					})
					.catch((err) => next(error.VALIDATION_FAILED(err.errors[0])));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	edit: (req, res, next) => {
		try {
			assert(req.body.course !== undefined);
		} catch (err) {
			return next(error.INVALID_JSON());
		}

		Course.findByPk(req.params.id)
			.then((course) => {
				if (!course) return next(error.COURSE_NOT_FOUND());
				const { code, name, initials, ects } = req.body.course;
				course
					.update({ code, name, initials, ects })
					.then((updatedCourse) => res.json(updatedCourse))
					.catch((err) => next(error.VALIDATION_FAILED(err.errors[0])));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	delete: (req, res, next) => {
		Course.findByPk(req.params.id)
			.then((course) => {
				if (!course) return next(error.COURSE_NOT_FOUND());
				return course
					.destroy()
					.then(() => res.status(204).json())
					.catch((err) => next(error.DB_DOWN()));
			})
			.catch((err) => next(error.DB_DOWN()));
	}
};
