const User = require('../../db/models/User');
const { status, insertOne, insertMany } = require('./utils');

module.exports = {
	selectAll: (req, res) =>
		User.findAll()
			.then((users) => res.json(users))
			.catch((err) => status(res, 500)),

	selectById: (req, res) =>
		User.findByPk(req.params.id)
			.then((user) => (user ? res.json(user) : status(res, 404)))
			.catch((err) => status(res, 500)),

	insert: (req, res) => {
		const { action } = req.body;
		if (action === 'insert_one') {
			const user = req.body.user;
			return insertOne(user, res, User);
		} else if (action === 'insert_many') {
			const users = req.body.users;
			return insertMany(users, res, User);
		}
		return status(res, 400);
	},

	edit: (req, res) =>
		User.findByPk(req.params.id)
			.then((user) =>
				user
					? user
							.update(req.body.user)
							.then((updatedUser) => res.json(updatedUser))
					: status(res, 404)
			)
			.catch((err) => status(res, 500)),

	delete: (req, res) =>
		User.findByPk(req.params.id)
			.then((user) =>
				user ? user.destroy().then(() => status(res, 200)) : status(res, 404)
			)
			.catch((err) => status(res, 500))
};
