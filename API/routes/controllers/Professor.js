const Professor = require('../../db/models/Professor');
const error = require('../../utils/errors');

module.exports = {
	selectAll: (req, res, next) => {
		Professor.findAll({
			attributes: {
				exclude: ['id', 'createdAt', 'updatedAt']
			},
			include: {
				association: 'user',
				attributes: { exclude: ['id', 'password'] }
			}
		})
			.then((professors) => res.json(professors))
			.catch((err) => next(error.DB_DOWN()));
	},

	selectById: (req, res, next) => {
		Professor.findOne({
			where: { userId: req.params.id },
			attributes: {
				exclude: ['id', 'createdAt', 'updatedAt']
			},
			include: {
				association: 'user',
				attributes: { exclude: ['id', 'password'] }
			}
		})
			.then((professor) =>
				professor ? res.json(professor) : next(error.USER_NOT_FOUND())
			)
			.catch((err) => next(error.DB_DOWN()));
	}
};
