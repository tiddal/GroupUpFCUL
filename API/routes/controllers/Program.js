const Program = require('../../db/models/Program');
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

	insert: (req, res) => {
        Program.bulkCreate(req.body.programs)
            .then((program) => res.json(program))
            .catch((err) => status(res, 400))
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
			.then((Program) =>
				program ? program.destroy().then(() => status(res, 200)) : status(res, 404)
			)
			.catch((err) => status(res, 500));
	}
};
