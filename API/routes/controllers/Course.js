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

	insert: async (req, res) => {
		const programId = req.params.id;
		const { name, description, ects } = req.body.course;

		const program = await Program.findByPk(programId);

		if (!program) return status(400);

		const [course] = await Course.findOrCreate({
			where: { name },
			defaults: { name, description, ects }
		});

		await program.addCourse(course);

		return res.json(course);
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
			.then((Course) =>
				course
					? course.destroy().then(() => status(res, 200))
					: status(res, 404)
			)
			.catch((err) => status(res, 500));
	}
};
