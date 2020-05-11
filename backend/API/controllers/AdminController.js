const connection = require('../db/config/connection');
const errors = require('../utils/errors');

class AdminController {
	constructor() {
		this.find = this.find.bind(this);
		this.modify = this.modify.bind(this);
	}

	async index(request, response) {
		const admins = await connection('Admin')
			.join('User', 'User.id', '=', 'Admin.user_id')
			.select([
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.email',
				'Admin.previleges',
			]);
		return response.json(admins);
	}

	async find(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [admin] = await connection('Admin')
			.join('User', 'User.id', '=', 'Admin.user_id')
			.select([
				'User.username',
				'User.first_name',
				'User.last_name',
				'User.email',
				'Admin.previleges',
			])
			.where('Admin.user_id', user.id);
		if (!admin) return next(errors.ADMIN_NOT_FOUND(user.username, 'params'));
		return response.json(admin);
	}

	async modify(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [admin] = await connection('Admin')
			.select('user_id')
			.where({ user_id: user.id });
		if (!admin) return next(errors.ADMIN_NOT_FOUND(user.username, 'params'));
		const { previleges } = request.body.admin;
		const [updatedAdmin] = await connection('Admin').where(admin).update(
			{
				previleges,
			},
			['previleges']
		);

		return response.json(updatedAdmin);
	}

	async findUser(request, response, next) {
		const { username } = request.params;
		const [user] = await connection('User')
			.select(['id', 'username'])
			.where({ username });
		if (!user) return next(errors.USER_NOT_FOUND(username, 'params'));
		return user;
	}
}

module.exports = new AdminController();
