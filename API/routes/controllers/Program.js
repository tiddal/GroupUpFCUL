const Program = require('../../db/models/Program');
const Course = require('../../db/models/Course');

const { status } = require('./utils');

module.exports = {
	selectAll: (req, res) => {
		Program.findAll()
			.then((programs) => res.json(programs))
			.catch((err) => status(res, 500));
	},

	selectById: (req, res) => {
		Program.findByPk(req.params.id)
			.then((program) => (program ? res.json(program) : status(res, 404)))
			.catch((err) => status(res, 500));
	},

	insert: async (req, res) => {
		try {
			const programsJSON = req.body.programs;
			const programs = await Promise.all(
				programsJSON.map(async (programJSON) => {
					const {
						code,
						name,
						cycle,
						description,
						courses: coursesJSON
					} = programJSON;

					const program = await Program.create({
						code,
						name,
						cycle,
						description
					});

					const courses = await Promise.all(
						coursesJSON.map(async (courseJSON) => {
							const { code } = courseJSON;
							const [course, created] = await Course.findOrCreate({
								where: { code },
								defaults: courseJSON
							});
							await program.addCourse(course);
							return course;
						})
					);
					program.dataValues = { ...program.dataValues, courses };
					return program;
				})
			);
			return res.json({ programs: [...programs] });
		} catch (err) {
			return status(res, 400);
		}
	},

	edit: (req, res) => {
		Program.findByPk(req.params.id)
			.then((program) =>
				program
					? program
							.update(req.body.program)
							.then((updatedProgram) => res.json(updatedProgram))
					: status(res, 404)
			)
			.catch((err) => status(res, 500));
	},

	delete: (req, res) => {
		Program.findByPk(req.params.id)
			.then((program) =>
				program
					? program.destroy().then(() => status(res, 200))
					: status(res, 404)
			)
			.catch((err) => status(res, 500));
	}
};
