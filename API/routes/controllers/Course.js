const Course = require('../../db/models/Course');
const { status } = require('./utils');

module.exports = {
	selectAll: (req, res) => {
		Course.findAll()
			.then((courses) => res.json(courses))
			.catch((err) => status(res, 500));
	},

	selectById: (req, res) => {
		Course.findByPk(req.params.id)
			.then((course) => (course ? res.json(course) : status(res, 404)))
			.catch((err) => status(res, 500));
	},

	insert: (req, res) => {
        Course.bulkCreate(req.body.courses)
            .then((course) => res.json(course))
            .catch((err) => status(res, 400))
	},

	edit: (req, res) => {
		Course.findByPk(req.params.id)
			.then((course) =>
                course
					? course
							.update(req.body.course)
							.then((updatedCourse) => res.json(updatedCourse))
					: status(res, 404)
			)
			.catch((err) => status(res, 500));
	},

	delete: (req, res) => {
		Course.findByPk(req.params.id)
			.then((Course) =>
                course ? course.destroy().then(() => status(res, 200)) : status(res, 404)
			)
			.catch((err) => status(res, 500));
	}
};
