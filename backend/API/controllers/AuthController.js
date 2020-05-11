require('dotenv').config();
const bcrypt = require('bcryptjs');
const errors = require('../utils/errors');
const connection = require('../db/config/connection');
const jwt = require('jsonwebtoken');

class AuthController {
	async login(request, response, next) {
		const { email, password } = request.body.user;
		const [user] = await connection('User')
			.select('id', 'username', 'password')
			.where({ email });
		if (!user) return next(errors.LOGIN_FAILED());
		if (!bcrypt.compareSync(password, user.password))
			return next(errors.LOGIN_FAILED());
		const [admin] = await connection('Admin')
			.select('user_id')
			.where('user_id', user.id);
		const [professor] = await connection('Professor')
			.select('user_id')
			.where('user_id', user.id);
		const [student] = await connection('Student')
			.select('user_id')
			.where('user_id', user.id);
		if (admin) user.role = 'admin';
		if (professor) user.role = 'professor';
		if (student) user.role = 'student';
		if (!user.role) return next(errors.LOGIN_FAILED());
		const token = jwt.sign(
			{ id: user.id, username: user.username, role: user.role },
			process.env.APP_SECRET,
			{
				expiresIn: '1d',
			}
		);
		return response.json({ token });
	}
}

module.exports = new AuthController();
