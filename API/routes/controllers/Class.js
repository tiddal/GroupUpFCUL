const Class = require('../../db/models/Class');

const { status } = require('./utils');

module.exports = {
	selectAll: (req, res) => {
		Class.findAll()
			.then((classes) => res.json(classes))
			.catch((err) => status(res, 500));
	},

	selectById: (req, res) => {
		Class.findByPk(req.params.id)
			.then((classes) => (classs ? res.json(classs) : status(res, 404)))
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
