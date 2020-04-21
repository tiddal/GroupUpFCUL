const express = require('express');
const classes = express.Router({ mergeParams: true });

const { adminRequired, loginRequired } = require('../middleware/permissions');

const ClassController = require('../controllers/ClassController');
const ClassValidator = require('../validators/ClassValidator');

classes.get(
	'/:year/:class_number/students',
	loginRequired,
	ClassController.findStudents
);
classes.post(
	'/:year/:class_number/students',
	adminRequired,
	ClassValidator.createStudents,
	ClassController.storeStudents
);
classes.delete(
	'/:year/:class_number/students/:student_username',
	adminRequired,
	ClassValidator.removeStudent,
	ClassController.removeStudent
);

classes.get(
	'/:year/:class_number/professors',
	loginRequired,
	ClassController.findProfessors
);
classes.post(
	'/:year/:class_number/professors',
	adminRequired,
	ClassValidator.createProfessors,
	ClassController.storeProfessors
);
classes.delete(
	'/:year/:class_number/professors/:professor_username',
	adminRequired,
	ClassValidator.removeProfessor,
	ClassController.removeProfessor
);

classes.get('/', loginRequired, ClassController.index);
classes.get(
	'/:year/:class_number',
	loginRequired,
	ClassValidator.find,
	ClassController.find
);
classes.post('/', adminRequired, ClassValidator.create, ClassController.store);
classes.put(
	'/:year/:class_number',
	adminRequired,
	ClassValidator.find,
	ClassValidator.edit,
	ClassController.modify
);
classes.delete(
	'/:year/:class_number',
	adminRequired,
	ClassValidator.find,
	ClassController.remove
);

module.exports = classes;
