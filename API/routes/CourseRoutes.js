const express = require('express');
const courses = express.Router();

const CourseController = require('../controllers/CourseController');
const CourseValidator = require('../validators/CourseValidator');
const UnitRoutes = require('./UnitRoutes');

courses.use('/:code/units', CourseValidator.find, UnitRoutes);

courses.get('/', CourseController.index);
courses.get('/:code', CourseValidator.find, CourseController.find);
courses.post('/', CourseValidator.create, CourseController.store);
courses.put(
	'/:code',
	CourseValidator.find,
	CourseValidator.edit,
	CourseController.modify
);
courses.delete('/:code', CourseController.remove);

module.exports = courses;
