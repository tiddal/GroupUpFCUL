const Program = require('../../db/models/Program');
const Course = require('../../db/models/Course');

const error = require('../../utils/errors');
const assert = require('assert');

const { status } = require('./utils');

module.exports = {
	selectAll: (req, res, next) => {
		Program.findAll()
			.then((programs) => res.json(programs))
			.catch((err) => next(error.DB_DOWN()));
	},

	selectById: (req, res, next) => {
		Program.findByPk(req.params.id)
			.then((program) =>
				program ? res.json(program) : next(error.PROGRAM_NOT_FOUND())
			)
			.catch((err) => next(error.DB_DOWN()));
	},

	insert: async (req, res, next) => {
		const programsJSON = req.body.programs;
		let programs = [];
		try {
			assert(req.body.programs !== undefined);
		} catch (err) {
			return next(error.INVALID_JSON());
		}

		try {
			for (let [index, programJSON] of programsJSON.entries()) {
				const {
					code,
					name,
					cycle,
					initials,
					courses: coursesJSON
				} = programJSON;

				const [program, created] = await Program.findOrCreate({
					where: { code },
					defaults: { code, name, cycle, initials }
				});

				programs.push({ ...program.dataValues, courses: [] });

				for (courseJSON of coursesJSON) {
					const { code, name, initials, ects } = courseJSON;
					const [course, created] = await Course.findOrCreate({
						where: { code },
						defaults: { code, name, initials, ects }
					});
					await program.addCourse(course);
					programs[index].courses.push(course);
				}
			}
			return res.status(201).json({ programs: [...programs] });
		} catch (err) {
			switch (err.name) {
				case 'SequelizeValidationError':
					return res.status(422).json({
						error: error.VALIDATION_FAILED(err.errors[0]),
						created: {
							programs
						}
					});
				default:
					return next(error.DB_DOWN());
			}
		}
	},

	edit: (req, res, next) => {
		try {
			assert(req.body.program !== undefined);
		} catch (err) {
			return next(error.INVALID_JSON());
		}
		Program.findByPk(req.params.id)
			.then((program) => {
				if (!program) return next(error.PROGRAM_NOT_FOUND());
				const { code, name, cycle, initials } = req.body.program;
				return program
					.update({ code, name, cycle, initials })
					.then((updatedProgram) => res.json(updatedProgram))
					.catch((err) => next(error.VALIDATION_FAILED(err.errors[0])));
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	delete: (req, res) => {
		Program.findByPk(req.params.id)
			.then((program) =>
				program
					? program.destroy().then(() => res.status(204).json())
					: next(error.PROGRAM_NOT_FOUND())
			)
			.catch((err) => next(error.DB_DOWN()));
	}
};
