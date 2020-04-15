const express = require('express');
const professors = express.Router();

const ProfessorController = require('../controllers/ProfessorController');

const UserValidator = require('../validators/UserValidator');
const ProfessorValidator = require('../validators/ProfessorValidator');

professors.get('/', ProfessorController.index);
professors.get('/:username', UserValidator.find, ProfessorController.find);
professors.put(
	'/:username',
	UserValidator.find,
	ProfessorValidator.edit,
	ProfessorController.modify
);

module.exports = professors;
