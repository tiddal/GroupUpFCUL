const { status } = require('../routes/controllers/utils');

const Admin = require('../db/models/Admin');
const User = require('../db/models/User');

module.exports = {
	sessionRequired: (req, res, next) => {
		if (!(req.session && req.session.userId)) {
			return next();
		}

		User.findByPk(req.session.userId, {
			attributes: {
				exclude: ['password']
			}
		})
			.then((user) => {
				if (!user) {
					return next();
				}
				req.user = user;
				res.locals.user = user;
				next();
			})
			.catch((err) => next(err));
	},
	loginRequired: (req, res, next) => {
		!req.user ? status(res, 401) : next();
	},
	adminRequired: async (req, res, next) => {
		const admin = await Admin.findOne({ where: { userId: req.user.id } });
		!admin ? status(res, 401) : next();
	}
};
