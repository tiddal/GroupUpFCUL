const bcrypt = require('bcryptjs');

const User = require('../../db/models/User');
const { status } = require('./utils');

module.exports = {
	login: (req, res) => {
		const { email, password } = req.body.user;
		User.findOne({ where: { email } })
			.then((user) => {
				if (!user || !bcrypt.compareSync(password, user.password)) {
					return res.json({ message: 'Incorrect email or password' });
				}
				req.session.userId = user.id;
				return res.json({ message: 'Logged In' });
			})
			.catch((err) => status(res, 500));
	}
};
