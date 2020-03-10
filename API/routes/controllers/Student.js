const Student = require('../../db/models/Student');
const error = require('../../utils/errors');

module.exports = {
	selectAll: (req, res, next) => {
		Student.findAll({
			attributes: {
				exclude: ['id', 'createdAt', 'updatedAt']
			},
			include: {
				association: 'user',
				attributes: { exclude: ['id', 'password'] }
			}
		})
			.then((students) => {
				res.json(students);
			})
			.catch((err) => next(error.DB_DOWN()));
	},

	selectById: (req, res, next) => {
		Student.findOne({
			where: { userId: req.params.id },
			attributes: {
				exclude: ['id', 'createdAt', 'updatedAt']
			},
			include: {
				association: 'user',
				attributes: { exclude: ['id', 'password'] }
			}
		})
			.then((student) =>
				student ? res.json(student) : next(error.USER_NOT_FOUND())
			)
			.catch((err) => next(error.DB_DOWN()));
	}
};
