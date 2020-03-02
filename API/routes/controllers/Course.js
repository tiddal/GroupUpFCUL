const Program = require('../../db/models/Program');
const Course = require('../../db/models/Course');

const { status } = require('./utils');

module.exports = {
	selectAll: (req, res) => {
		Course.findAll()
			.then((courses) => res.json(courses))
			.catch((err) => status(res, 500));
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
