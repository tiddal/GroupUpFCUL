const express = require('express');
const students = express.Router();

const {
	loginRequired,
	selfRequired,
	adminRequired,
} = require('../middleware/permissions');

const StudentController = require('../controllers/StudentController');

const UserValidator = require('../validators/UserValidator');
const StudentValidator = require('../validators/StudentValidator');

students.get('/', adminRequired, StudentController.index);

students.get(
	'/:username/classes/:academic_year/:semester',
	loginRequired,
	StudentValidator.findClasses,
	StudentController.findClasses
);

students.get(
	'/:username/teams/:academic_year/:semester',
	loginRequired,
	StudentController.findTeams
);

students.get(
	'/:username',
	loginRequired,
	UserValidator.find,
	StudentController.find
);

students.put(
	'/:username',
	selfRequired,
	UserValidator.find,
	StudentValidator.edit,
	StudentController.modify
);

module.exports = students;
