const Program = require('../../db/models/Program');
const Course = require('../../db/models/Course');

const { status } = require('./utils');

module.exports = {
	selectAllByProgram: (req, res) => {
		const programId = req.params.id;

		Program.findByPk(programId, {
			include: {
				association: 'courses',
				through: {
					attributes: []
				}
			}
		})
			.then((program) => res.json(program.courses))
			.catch((err) => status(res, 400));
	},

	selectAll: (req, res) => {
		Course.findAll()
			.then((courses) => res.json(courses))
			.catch((err) => status(res, 500));
	},

	selectByIdByProgram: (req, res) => {
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
			.then((program) =>
				program.courses[0] ? res.json(program.courses[0]) : status(404)
			)
			.catch((err) => status(res, 404));
	},

	selectById: (req, res) => {
		Course.findByPk(req.params.id)
			.then((course) => (course ? res.json(course) : status(res, 404)))
			.catch((err) => status(res, 500));
	},

	insert: (req, res) => {
		const programId = req.params.id;
		const { name, code, description, ects } = req.body.course;

		Program.findByPk(programId)
			.then((program) => {
				return Course.findOrCreate({
					where: { code },
					defaults: { code, name, description, ects }
				})
					.then(([course, created]) => {
						return program
							.addCourse(course)
							.then(() => res.json(course))
							.catch((err) => status(res, 400));
					})
					.catch((err) => status(res, 400));
			})
			.catch((err) => status(res, 400));
	},

	edit: (req, res) => {
		Course.findByPk(req.params.id)
			.then((course) =>
				course
					? course
							.update(req.body.course)
							.then((updatedCourse) => res.json(updatedCourse))
					: status(res, 404)
			)
			.catch((err) => status(res, 500));
	},

	delete: (req, res) => {
		Course.findByPk(req.params.id)
			.then((course) =>
				course
					? course.destroy().then(() => status(res, 200))
					: status(res, 404)
			)
			.catch((err) => status(res, 500));
	}
};
