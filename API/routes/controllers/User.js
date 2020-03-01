const User = require('../../db/models/User');
const Student = require('../../db/models/Student');
const Admin = require('../../db/models/Admin');
const Professor = require('../../db/models/Professor');
const { status } = require('./utils');

module.exports = {
	selectAll: (req, res) => {
		User.findAll()
			.then((users) => res.json(users))
			.catch((err) => status(res, 500));
	},

	selectById: (req, res) => {
		User.findByPk(req.params.id)
			.then((user) => (user ? res.json(user) : status(res, 404)))
			.catch((err) => status(res, 500));
	},

	insert: async (req, res) => {
		try {
			//	Students
			const studentsRequest = req.body.users.filter(
				(user) => user.role.type === 'student'
			);
			const studentsUsers = await User.bulkCreate(studentsRequest);
			const studentsData = studentsUsers.map((user, index) => ({
				userId: user.id,
				...studentsRequest[index].role.data
			}));
			const students = await Student.bulkCreate(studentsData);

			//	Professors
			const professorsRequset = req.body.users.filter(
				(user) => user.role.type === 'professor'
			);
			const professorsUsers = await User.bulkCreate(professorsRequset);
			const professorsData = professorsUsers.map((user, index) => ({
				userId: user.id,
				...professorsRequset[index].role.data
			}));
			const professors = await Professor.bulkCreate(professorsData);

			//	Admins
			const adminsRequest = req.body.users.filter(
				(user) => user.role.type === 'admin'
			);
			const adminsUsers = await User.bulkCreate(adminsRequest);
			const adminsData = adminsUsers.map((user, index) => ({
				userId: user.id,
				...adminsRequest[index].role.data
			}));
			const admins = await Admin.bulkCreate(adminsData);

			return res.json({
				users: [...studentsUsers, ...adminsUsers, ...professorsUsers],
				students,
				professors,
				admins
			});
		} catch (err) {
			return status(res, 400);
		}
	},

	edit: (req, res) => {
		console.log(req.file);
		console.log(req.body);
		User.findByPk(req.params.id)
			.then((user) =>
				user
					? user
							.update(req.body.user)
							.then((updatedUser) => res.json(updatedUser))
					: status(res, 404)
			)
			.catch((err) => status(res, 500));
	},

	delete: (req, res) => {
		User.findByPk(req.params.id)
			.then((user) =>
				user ? user.destroy().then(() => status(res, 200)) : status(res, 404)
			)
			.catch((err) => status(res, 500));
	}
};
