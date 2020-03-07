const { status } = require('../routes/controllers/utils');
const error = require('../utils/errors');

const Admin = require('../db/models/Admin');
const User = require('../db/models/User');

module.exports = {
	sessionRequired: async (req, res, next) => {
		if (!(req.session && req.session.userId)) {
			return next();
		}
		try {
			const user = await User.findByPk(req.session.userId, {
				attributes: {
					exclude: ['password']
				}
			});

			if (!user) {
				return next();
			}

			req.user = user;
			res.locals.user = user;

			return next();
		} catch (err) {
			return next(error.DB_DOWN());
		}
	},
	loginRequired: (req, res, next) => {
		if (!req.user) {
			return next(error.LOGGIN_REQUIRED());
		}
		return next();
	},
	adminRequired: async (req, res, next) => {
		const admin = await Admin.findOne({ where: { userId: req.user.id } });
		if (!admin) {
			return next(error.NO_ADMIN_PERMISSIONS());
		}
		return next();
	}
};
