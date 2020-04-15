require('dotenv').config();
const bcrypt = require('bcryptjs');
const errors = require('../utils/errors');
const connection = require('../db/config/connection');

class AuthController {
	async login(request, response, next) {
		const { email, password } = request.body.user;
		const [user] = await connection('users')
			.select('username', 'password')
			.where('email', email);
		if (!user) return next(errors.LOGIN_FAILED());
		if (!bcrypt.compareSync(password, user.password))
			return next(errors.LOGIN_FAILED());
		request.session.username = user.username;
		user.password = undefined;
		return response.json(user);
	}

	async logout(request, response) {
		request.session.reset();
		response.clearCookie('session');
		return response.status(204).send();
	}

	async me(request, response, next) {
		const { username } = request.session;
		try {
			const [user] = await connection('users')
				.select(
					'username',
					'first_name',
					'last_name',
					'email',
					'status',
					'avatar_url'
				)
				.where('username', username);
			if (!user) return next(errors.USER_NOT_FOUND(username, 'cookies'));
			return response.json(user);
		} catch (error) {
			return next(errors.LOGIN_REQUIRED());
		}
	}
}

module.exports = new AuthController();
