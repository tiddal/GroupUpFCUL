const express = require('express');
const classes = express.Router({ mergeParams: true });
const ClassController = require('../controllers/ClassController');

classes.get('/', ClassController.index);
classes.get('/:year/:class_number', ClassController.find);
classes.post('/', ClassController.store);
classes.put('/:year/:class_number', ClassController.modify);
classes.delete('/:year/:class_number', ClassController.remove);

// classes.get('/:year/:class_number/students', ClassController.findStudents)
// classes.get('/:year/:class_number/professors', ClassController.findProfessors)
// classes.post('/:year/:class_number/students', ClassController.storeStudent)
// classes.post('/:year/:class_number/professors', ClassController.storeProfessor)
// classes.delete('/:year/:class_number/students', ClassController.removeStudent)
// classes.delete('/:year/:class_number/professors', ClassController.removeProfessor)

module.exports = classes;
