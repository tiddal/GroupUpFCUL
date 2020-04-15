const express = require('express');
const classes = express.Router({ mergeParams: true });
const ClassController = require('../controllers/ClassController');
const ClassValidator = require('../validators/ClassValidator');

classes.get('/:year/:class_number/students', ClassController.findStudents);
classes.post(
	'/:year/:class_number/students',
	ClassValidator.createStudents,
	ClassController.storeStudents
);
classes.delete(
	'/:year/:class_number/students/:student_username',
	ClassValidator.removeStudent,
	ClassController.removeStudent
);

classes.get('/:year/:class_number/professors', ClassController.findProfessors);
classes.post(
	'/:year/:class_number/professors',
	ClassValidator.createProfessors,
	ClassController.storeProfessors
);
classes.delete(
	'/:year/:class_number/professors/:professor_username',
	ClassValidator.removeProfessor,
	ClassController.removeProfessor
);

classes.get('/', ClassController.index);
classes.get('/:year/:class_number', ClassValidator.find, ClassController.find);
classes.post('/', ClassValidator.create, ClassController.store);
classes.put(
	'/:year/:class_number',
	ClassValidator.find,
	ClassController.modify
);
classes.delete(
	'/:year/:class_number',
	ClassValidator.find,
	ClassController.remove
);

module.exports = classes;
