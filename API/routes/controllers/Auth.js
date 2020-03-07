const bcrypt = require('bcryptjs');
const error = require('../../utils/errors');

const User = require('../../db/models/User');

const { status } = require('./utils');

module.exports = {
	login: (req, res, next) => {
		const { email, password } = req.body.user;
		User.findOne({ where: { email } })
			.then((user) => {
				if (!user || !bcrypt.compareSync(password, user.password)) {
					return next(error.LOGIN_FAILED());
				}
				req.session.userId = user.id;
				return res.json({
					success: `Logged In as ${res.locals.user.username}`
				});
			})
			.catch((err) => next(error.DB_DOWN()));
	}
};
