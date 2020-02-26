const Professor = require('../../db/models/Professor');
const { status } = require('./utils');

module.exports = {
	selectAll: (req, res) => {
		Professor.findAll()
			.then((professors) => res.json(professors))
			.catch((err) => status(res, 500));
	},

	selectById: (req, res) => {
		Professor.findOne({ where: { userId: req.params.id } })
			.then((professor) => (professor ? res.json(professor) : status(res, 404)))
			.catch((err) => status(res, 500));
	}
};
