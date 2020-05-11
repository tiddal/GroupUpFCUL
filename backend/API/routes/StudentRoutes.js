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
