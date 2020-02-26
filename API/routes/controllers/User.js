const User = require('../../db/models/User');
const Student = require('../../db/models/Student');
const Admin = require('../../db/models/Admin');
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

	insert: async (req, res) => {
		const studentsData = req.body.users.filter(
			(user) => user.role.type === 'student'
		);
		const professorsData = req.body.users.filter(
			(user) => user.role.type === 'professor'
		);
		const adminsData = req.body.users.filter(
			(user) => user.role.type === 'admin'
		);
		try {
			const students = await User.bulkCreate(studentsData);
			const studentsIds = students.map((user) => ({ userId: user.id }));
			const createdStudents = await Student.bulkCreate(studentsIds);
			const admins = await User.bulkCreate(adminsData);
			const adminsIds = admins.map((user) => ({ userId: user.id }));
			const createdAdmins = await Admin.bulkCreate(adminsIds);
			return res.json({
				users: [...students, ...admins],
				students: createdStudents,
				admins: createdAdmins
			});
		} catch (err) {
			return status(res, 400);
		}

		// User.bulkCreate(students)
		// 	.then(async (users) => {
		// 		const studentsIds = users.map((user) => ({ userId: user.id }));
		// 		const createdStudents = await Student.bulkCreate(studentsIds);
		// 		const createdAdmins = await Admin.bulkCreate()
		// 		return res.json({ users, students: createdStudents });
		// 	})
		// 	.catch((err) => status(res, 400));
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
