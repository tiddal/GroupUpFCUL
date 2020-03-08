const Admin = require('../../db/models/Admin');
const error = require('../../utils/errors');
const { status } = require('./utils');

module.exports = {
	selectAll: (req, res, next) => {
		Admin.findAll({
			attributes: {
				exclude: ['id', 'createdAt', 'updatedAt']
			},
			include: {
				association: 'user',
				attributes: { exclude: ['id', 'password'] }
			}
		})
			.then((admins) => res.json(admins))
			.catch((err) => next(error.DB_DOWN()));
	},

	selectById: (req, res, next) => {
		Admin.findOne({
			where: { userId: req.params.id },
			attributes: {
				exclude: ['id', 'createdAt', 'updatedAt']
			},
			include: {
				association: 'user',
				attributes: { exclude: ['id', 'password'] }
			}
		})
			.then((admin) => (admin ? res.json(admin) : next(error.USER_NOT_FOUND())))
			.catch((err) => next(error.DB_DOWN()));
	}
};
