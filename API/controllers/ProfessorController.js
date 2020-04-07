const connection = require('../db/config/connection');
const errors = require('../utils/errors');

class ProfessorController {
	async index(request, response) {
		const professors = await connection('professors')
			.join('users', 'users.username', '=', 'professors.username')
			.select([
				'professors.*',
				'users.first_name',
				'users.last_name',
				'users.email',
			]);
		return response.json(professors);
	}

	async find(request, response, next) {
		const { username } = request.params;
		const [professor] = await connection('professors')
			.join('users', 'users.username', '=', 'professors.username')
			.select([
				'professors.*',
				'users.first_name',
				'users.last_name',
				'users.email',
			])
			.where('professors.username', username);
		if (!professor) return next(errors.PROFESSOR_NOT_FOUND());
		return response.json(professor);
	}

	async modify(request, response, next) {
		const { username } = request.params;
		const [professor] = await connection('professors')
			.select('username')
			.where('username', username);
		if (!professor) return next(errors.PROFESSOR_NOT_FOUND());
		const { room, department } = request.body.professor;
		const [updatedProfessor] = await connection('professors')
			.where(professor)
			.update(
				{
					room,
					department,
				},
				['*']
			);

		return response.json(updatedProfessor);
	}
}

module.exports = new ProfessorController();
