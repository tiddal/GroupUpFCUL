const Professor = require('../../db/models/Professor');
const { status } = require('./utils');

module.exports = {
	selectAll: (req, res) => {
		Professor.findAll({
			attributes: {
				exclude: ['userId', 'createdAt', 'updatedAt']
			},
			include: { association: 'user' }
		})
			.then((professors) => res.json(professors))
			.catch((err) => status(res, 500));
	},

	selectById: (req, res) => {
		Professor.findOne({
			where: { userId: req.params.id },
			attributes: {
				exclude: ['userId', 'createdAt', 'updatedAt']
			},
			include: { association: 'user' }
		})
			.then((professor) => (professor ? res.json(professor) : status(res, 404)))
			.catch((err) => status(res, 500));
	}
};
