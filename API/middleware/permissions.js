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
		if (!req.user) {
			const error = new Error('Unauthorized');
			error.title = 'Not logged in';
			error.status = 401;
			error.detail = 'You must be logged in to access this resource.';
			return next(error);
		}
		next();
	},
	adminRequired: async (req, res, next) => {
		const admin = await Admin.findOne({ where: { userId: req.user.id } });
		if (!admin) {
			const error = new Error('Unauthorized');
			error.title = 'Not an Admin';
			error.status = 401;
			error.detail = "You don't have admin previleges to access this resource.";
			return next(error);
		}
		next();
	}
};
