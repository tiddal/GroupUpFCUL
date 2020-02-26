const User = require('../../db/models/User');
const Student = require('../../db/models/Student');
const { status } = require('./utils');

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
		const students = req.body.users.filter(
			(user) => user.role.type === 'student'
		);
		const professors = req.body.users.filter(
			(user) => user.role.type === 'professor'
		);
		const admins = req.body.users.filter((user) => user.role.type === 'admin');

		User.bulkCreate(students)
			.then((users) => {
				const studentsIds = users.map((user) => ({ userId: user.id }));
				Student.bulkCreate(studentsIds)
					.then((createdStudents) =>
						res.json({ users, students: createdStudents })
					)
					.catch((err) => status(res, 400));
			})
			.catch((err) => status(res, 400));
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
