const connection = require('../db/config/connection');
const errors = require('../utils/errors');

class ProfessorController {
	constructor() {
		this.find = this.find.bind(this);
		this.modify = this.modify.bind(this);
	}

	async index(request, response) {
		const professors = await connection('professors')
			.join('users', 'users.id', '=', 'professors.user_id')
			.select([
				'users.username',
				'users.first_name',
				'users.last_name',
				'users.email',
				'professors.room',
				'professors.department',
			]);
		return response.json(professors);
	}

	async find(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [professor] = await connection('professors')
			.join('users', 'users.id', '=', 'professors.user_id')
			.select([
				'users.username',
				'users.first_name',
				'users.last_name',
				'users.email',
				'professors.room',
				'professors.department',
			])
			.where('professors.user_id', user.id);
		if (!professor)
			return next(errors.PROFESSOR_NOT_FOUND(user.username, 'params'));
		return response.json(professor);
	}

	async modify(request, response, next) {
		const user = await this.findUser(request, response, next);
		if (!user) return next();
		const [professor] = await connection('professors')
			.select('user_id')
			.where({ user_id: user.id });
		if (!professor)
			return next(errors.PROFESSOR_NOT_FOUND(user.username, 'params'));
		const { room, department } = request.body.professor;
		const [updatedProfessor] = await connection('professors')
			.where(professor)
			.update(
				{
					room,
					department,
				},
				['room', 'department']
			);

		return response.json(updatedProfessor);
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

module.exports = new ProfessorController();
