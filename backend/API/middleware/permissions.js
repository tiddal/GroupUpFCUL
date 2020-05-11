require('dotenv').config();
const error = require('../utils/errors');
const connection = require('../db/config/connection');
const jwt = require('jsonwebtoken');

module.exports = {
	verifyToken: async (request, response, next) => {
		const authHeader = request.headers.authorization;
		if (!authHeader) return next();
		const parts = authHeader.split(' ');
		if (!parts.length === 2) return next();
		const [scheme, token] = parts;
		if (scheme !== 'Bearer') return next();

		jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
			if (err) return next();
			request.user = {
				id: decoded.id,
				username: decoded.username,
				role: decoded.role,
			};
			return next();
		});
	},

	loginRequired: (request, response, next) => {
		if (!request.user) return next(error.LOGIN_REQUIRED());
		return next();
	},

	adminRequired: async (request, response, next) => {
		if (!request.user) return next(error.LOGIN_REQUIRED());
		if (request.user.role !== 'admin')
			return next(error.NO_ADMIN_PERMISSIONS());
		return next();
	},

	professorRequired: async (request, response, next) => {
		if (!request.user) return next(error.LOGIN_REQUIRED());
		if (request.user.role !== 'professor')
			return next(error.NO_PROFESSOR_PERMISSIONS());
		return next();
	},

	selfRequired: async (request, response, next) => {
		if (!request.user) return next(error.LOGIN_REQUIRED());
		if (
			request.params.username === request.user.username ||
			request.user.role === 'admin'
		)
			return next();
		return next(error.INVALID_IDENTITY());
	},
};
