const bcrypt = require('bcryptjs');
const error = require('../../utils/errors');

const User = require('../../db/models/User');

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
					success: `Logged In as ${user.username}`
				});
			})
			.catch((err) => next(error.DB_DOWN()));
	},
	logout: (req, res, next) => {
		req.session.reset();
		return res.json({ message: 'Logged out.' });
	}
};
