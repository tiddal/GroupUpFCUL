const User = require('../../db/models/User');
const Student = require('../../db/models/Student');
const Admin = require('../../db/models/Admin');
const Professor = require('../../db/models/Professor');
const bcrypt = require('bcryptjs');
const error = require('../../utils/errors');
const assert = require('assert');

module.exports = {
	selectAll: (req, res, next) => {
		User.findAll()
			.then((users) => res.json(users))
			.catch((err) => next(error.DB_DOWN()));
	},

	selectById: (req, res, next) => {
		User.findByPk(req.params.id)
			.then((user) => (user ? res.json(user) : next(error.USER_NOT_FOUND())))
			.catch((err) => next(error.DB_DOWN()));
	},

	insert: async (req, res, next) => {
		let studentsJSON;
		let studentsUsers = [];
		let students = [];

		let professorsJSON;
		let professorsUsers = [];
		let professors = [];

		let adminsJSON;
		let adminsUsers = [];
		let admins = [];

		//	Check if the tables are set
		try {
			await User.findOne();
			await Student.findOne();
			await Professor.findOne();
			await Admin.findOne();
		} catch (err) {
			return next(error.DB_DOWN());
		}

		//	Handle the JSON
		try {
			//	Check if role is defined and if it's valid
			req.body.users.map((user) => {
				const role = user.role.type;
				assert(
					role &&
						(role === 'student' || role === 'professor' || role === 'admin')
				);
			});

			//	Bcrypt the passwords
			req.body.users = req.body.users.map((user) => ({
				...user,
				password: bcrypt.hashSync(user.password, 14)
			}));

			//	Get the students JSON
			studentsJSON = req.body.users.filter(
				(user) => user.role.type === 'student'
			);

			//	Get the professors JSON
			professorsJSON = req.body.users.filter(
				(user) => user.role.type === 'professor'
			);

			//	Get the admins JSON
			adminsJSON = req.body.users.filter((user) => user.role.type === 'admin');
		} catch (err) {
			return next(error.INVALID_JSON());
		}

		//	Populate the DB
		try {
			//	Students
			studentsUsers = await User.bulkCreate(studentsJSON, {
				individualHooks: true,
				validate: true
			});
			const studentsData = studentsUsers.map((user, index) => ({
				userId: user.id,
				...studentsJSON[index].role.data
			}));
			students = await Student.bulkCreate(studentsData, {
				individualHooks: true,
				validate: true
			});

			//	Professors
			professorsUsers = await User.bulkCreate(professorsJSON, {
				individualHooks: true,
				validate: true
			});
			const professorsData = professorsUsers.map((user, index) => ({
				userId: user.id,
				...professorsJSON[index].role.data
			}));
			professors = await Professor.bulkCreate(professorsData, {
				individualHooks: true,
				validate: true
			});

			//	Admins
			adminsUsers = await User.bulkCreate(adminsJSON, {
				individualHooks: true,
				validate: true
			});
			const adminsData = adminsUsers.map((user, index) => ({
				userId: user.id,
				...adminsJSON[index].role.data
			}));
			admins = await Admin.bulkCreate(adminsData, {
				individualHooks: true,
				validate: true
			});

			return res.status(201).json({
				users: [...studentsUsers, ...adminsUsers, ...professorsUsers],
				students: students,
				professors,
				admins
			});
		} catch (err) {
			switch (err.name) {
				case 'AggregateError':
					return res.status(422).json({
						error: error.VALIDATION_FAILED(err['0'].errors.errors[0]),
						created: {
							users: [...studentsUsers, ...adminsUsers, ...professorsUsers],
							students,
							professors,
							admins
						}
					});

				case 'SequelizeUniqueConstraintError':
					if (err.errors[0].path === 'Users.username') {
						return res.status(409).json({
							error: error.USERNAME_EXISTS(err.errors[0]),
							created: {
								users: [...studentsUsers, ...adminsUsers, ...professorsUsers],
								students,
								professors,
								admins
							}
						});
					} else if (err.errors[0].path === 'Users.email') {
						return res.status(409).json({
							error: error.EMAIL_EXISTS(err.errors[0]),
							created: {
								users: [...studentsUsers, ...adminsUsers, ...professorsUsers],
								students,
								professors,
								admins
							}
						});
					}

				default:
					return next(error.DB_DOWN());
			}
		}
	},

	edit: (req, res, next) => {
		//	Check if the avatar was uploaded and gets its location
		const avatarURL = req.file
			? req.file.location
				? req.file.location
				: `${process.env.APP_URL}/files/${req.file.key}`
			: null;

		try {
			assert(req.body.user.status);
		} catch (err) {
			return next(error.INVALID_JSON());
		}

		User.findByPk(req.params.id)
			.then((user) => {
				if (!user) {
					return next(error.USER_NOT_FOUND());
				}
				return user
					.update({ status: req.body.user.status, avatarURL })
					.then((updatedUser) => res.json(updatedUser));
			})
			.catch((err) => error.DB_DOWN());
	},

	delete: (req, res, next) => {
		User.findByPk(req.params.id)
			.then((user) =>
				user
					? user.destroy().then(() => res.status(204).json())
					: next(error.NOT_FOUND())
			)
			.catch((err) => next(error.DB_DOWN()));
	}
};
