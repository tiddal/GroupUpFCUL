const express = require('express');
const courses = express.Router();

const { adminRequired, loginRequired } = require('../middleware/permissions');

const CourseController = require('../controllers/CourseController');
const CourseValidator = require('../validators/CourseValidator');
const UnitRoutes = require('./UnitRoutes');

courses.use('/:code/units', CourseValidator.find, UnitRoutes);

courses.get('/', loginRequired, CourseController.index);
courses.get(
	'/:code',
	loginRequired,
	CourseValidator.find,
	CourseController.find
);
courses.post(
	'/',
	adminRequired,
	CourseValidator.create,
	CourseController.store
);
courses.put(
	'/:code',
	adminRequired,
	CourseValidator.find,
	CourseValidator.edit,
	CourseController.modify
);
courses.delete('/:code', adminRequired, CourseController.remove);

module.exports = courses;
