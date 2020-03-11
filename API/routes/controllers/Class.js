const Class = require('../../db/models/Class');
const Program = require('../../db/models/Program');
const Course = require('../../db/models/Course');

const error = require('../../utils/errors');
const assert = require('assert');

const { status } = require('./utils');

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

	selectById: (req, res) => {
		Class.findByPk(req.params.id)
			.then((classes) => (classs ? res.json(classs) : status(res, 404)))
			.catch((err) => status(res, 500));
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
						return Class.bulkCreate(classesJSON).then((classes) =>
							res
								.status(201)
								.json(classes)
								.catch((err) => res.json(err))
						);
					})
					.catch((err) => res.json(err));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	edit: (req, res) => {
		Class.findByPk(req.params.id)
			.then((classs) =>
				classs
					? classs
							.update(req.body.course)
							.then((updatedClass) => res.json(updatedClass))
					: status(res, 404)
			)
			.catch((err) => status(res, 500));
	},

	delete: (req, res) => {
		Class.findByPk(req.params.id)
			.then((classs) =>
				classs
					? classs.destroy().then(() => status(res, 200))
					: status(res, 404)
			)
			.catch((err) => status(res, 500));
	}
};
