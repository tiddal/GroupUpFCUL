const connection = require('../db/config/connection');
const errors = require('../utils/errors');

class AdminController {
	async index(request, response) {
		const admins = await connection('admins')
			.join('users', 'users.username', '=', 'admins.username')
			.select([
				'admins.*',
				'users.first_name',
				'users.last_name',
				'users.email',
			]);
		return response.json(admins);
	}

	async find(request, response, next) {
		const { username } = request.params;
		const [admin] = await connection('admins')
			.join('users', 'users.username', '=', 'admins.username')
			.select([
				'admins.*',
				'users.first_name',
				'users.last_name',
				'users.email',
			])
			.where('admins.username', username);
		if (!admin) return next(errors.ADMIN_NOT_FOUND());
		return response.json(admin);
	}

	async modify(request, response, next) {
		const { username } = request.params;
		const [admin] = await connection('admins')
			.select('username')
			.where('username', username);
		if (!admin) return next(errors.ADMIN_NOT_FOUND());
		const { previleges } = request.body.admin;
		const [updatedAdmin] = await connection('admins').where(admin).update(
			{
				previleges,
			},
			['*']
		);

		return response.json(updatedAdmin);
	}
}

module.exports = new AdminController();
