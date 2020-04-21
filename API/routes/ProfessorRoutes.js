const express = require('express');
const professors = express.Router();

const { loginRequired, selfRequired } = require('../middleware/permissions');

const ProfessorController = require('../controllers/ProfessorController');

const UserValidator = require('../validators/UserValidator');
const ProfessorValidator = require('../validators/ProfessorValidator');

professors.get('/', loginRequired, ProfessorController.index);
professors.get(
	'/:username',
	loginRequired,
	UserValidator.find,
	ProfessorController.find
);
professors.put(
	'/:username',
	selfRequired,
	UserValidator.find,
	ProfessorValidator.edit,
	ProfessorController.modify
);

module.exports = professors;
