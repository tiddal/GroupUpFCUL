const bcrypt = require('bcryptjs');
const error = require('../../utils/errors');
const assert = require('assert');

const User = require('../../db/models/User');

module.exports = {
	login: (req, res, next) => {
		try {
			assert(req.body.user !== undefined);
		} catch (err) {
			return next(error.INVALID_JSON());
		}

		const { email, password } = req.body.user;

		User.findOne({ where: { email } })
			.then((user) => {
				if (!user) return next(error.LOGIN_FAILED());
				if (!user || !bcrypt.compareSync(password, user.password)) {
					return next(error.LOGIN_FAILED());
				}
				req.session.userId = user.id;
				user.password = undefined;
				return res.json(user);
			})
			.catch((err) => next(error.DB_DOWN()));
	},
	logout: (req, res, next) => {
		req.session.reset();
		return res.json({ message: 'Logged out.' });
	}
};
