require('dotenv').config();
const error = require('../utils/errors');
const connection = require('../db/config/connection');

module.exports = {
	sessionRequired: async (request, response, next) => {
		if (!(request.session && request.session.username)) return next();
		const [user] = await connection('users')
			.select('username')
			.where('username', request.session.username);
		if (!user) return next();
		request.user = user;
		response.locals.user = user;
		return next();
	},

	loginRequired: (request, response, next) => {
		if (!request.user) return next(error.LOGIN_REQUIRED());
		return next();
	},

	adminRequired: async (request, response, next) => {
		const [admin] = await connection('admins')
			.select('username')
			.where('username', request.user.username);
		if (!admin) return next(error.NO_ADMIN_PERMISSIONS());
		return next();
	},

	selfRequired: async (request, response, next) => {
		const [admin] = await connection('admins')
			.select('username')
			.where('username', request.user.username);
		if (request.params.id === request.user.username || admin) return next();
		return next(error.INVALID_IDENTITY());
	},
};
