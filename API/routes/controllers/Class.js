const Class = require('../../db/models/Class');
const Program = require('../../db/models/Program');
const Course = require('../../db/models/Course');

const error = require('../../utils/errors');
const assert = require('assert');

module.exports = {
	selectAll: (req, res, next) => {
		const programId = req.params.id;
		const courseId = req.params.courseId;

		Program.findByPk(programId).then((program) => {
			if (!program) return next(error.PROGRAM_NOT_FOUND());
			return Course.findByPk(courseId).then((course) => {
				if (!course) return next(error.COURSE_NOT_FOUND());
				return Class.findAll({ where: { courseId } })
					.then((classes) => res.json(classes))
					.catch((err) => next(error.DB_DOWN()));
			});
		});
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
						return Class.findByPk(classId)
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
	}
};
