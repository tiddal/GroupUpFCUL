const express = require('express');
const students = express.Router();

const StudentController = require('../controllers/StudentController');

const UserValidator = require('../validators/UserValidator');
const StudentValidator = require('../validators/StudentValidator');

students.get('/', StudentController.index);
students.get('/:username', UserValidator.find, StudentController.find);
students.put(
	'/:username',
	UserValidator.find,
	StudentValidator.edit,
	StudentController.modify
);

module.exports = students;
