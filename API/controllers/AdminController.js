const connection = require('../db/config/connection');
const errors = require('../utils/errors');

class AdminController {
	constructor() {
		this.find = this.find.bind(this);
		this.modify = this.modify.bind(this);
	}

	async index(request, response) {
		const admins = await connection('admins')
			.join('users', 'users.id', '=', 'admins.user_id')
			.select([
				'users.username',
				'users.first_name',
				'users.last_name',
				'users.email',
				'admins.previleges',
			]);
		return response.json(admins);
	}

	async find(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [admin] = await connection('admins')
			.join('users', 'users.id', '=', 'admins.user_id')
			.select([
				'users.username',
				'users.first_name',
				'users.last_name',
				'users.email',
				'admins.previleges',
			])
			.where('admins.user_id', user.id);
		if (!admin) return next(errors.ADMIN_NOT_FOUND(user.username, 'params'));
		return response.json(admin);
	}

	async modify(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [admin] = await connection('admins')
			.select('user_id')
			.where({ user_id: user.id });
		if (!admin) return next(errors.ADMIN_NOT_FOUND(user.username, 'params'));
		const { previleges } = request.body.admin;
		const [updatedAdmin] = await connection('admins').where(admin).update(
			{
				previleges,
			},
			['previleges']
		);

		return response.json(updatedAdmin);
	}

	async findUser(request, response, next) {
		const { username } = request.params;
		const [user] = await connection('users')
			.select(['id', 'username'])
			.where({ username });
		if (!user) return next(errors.USER_NOT_FOUND(username, 'params'));
		return user;
	}
}

module.exports = new AdminController();
