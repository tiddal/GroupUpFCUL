const Student = require('../../db/models/Student');
const { status } = require('./utils');

module.exports = {
	selectAll: (req, res) => {
		Student.findAll()
			.then((students) => res.json(students))
			.catch((err) => status(res, 500));
	},

	selectById: (req, res) => {
		Student.findOne({ where: { userId: req.params.id } })
			.then((student) => (student ? res.json(student) : status(res, 404)))
			.catch((err) => status(res, 500));
	}
};
