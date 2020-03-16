const express = require('express');
const router = express.Router();
const ProgramController = require('./controllers/Program');
const CourseController = require('./controllers/Course');
const ClassController = require('./controllers/Class');

//	Students
router.get(
	'/:id/courses/:courseId/classes/:classId/students',
	ClassController.selectStudents
);
router.get(
	'/:id/courses/:courseId/classes/:classId/students/:studentId',
	ClassController.selectStudentById
);
router.post(
	'/:id/courses/:courseId/classes/:classId/students',
	ClassController.insertStudent
);
// router.delete(
// 	'/:id/courses/:courseId/classes/:classId/students/:studentId',
// 	StudentController.deleteStudent
// );

//	Professors
router.get(
	'/:id/courses/:courseId/classes/:classId/professors',
	ClassController.selectProfessors
);
router.get(
	'/:id/courses/:courseId/classes/:classId/professors/:professorId',
	ClassController.selectProfessorById
);
router.post(
	'/:id/courses/:courseId/classes/:classId/professors',
	ClassController.insertProfessor
);

router.delete(
	'/:id/courses/:courseId/classes/:classId/professors/:professorId',
	ClassController.removeProfessor
);

//	Classes
router.get('/:id/courses/:courseId/classes', ClassController.selectAll);
router.get(
	'/:id/courses/:courseId/classes/:classId',
	ClassController.selectById
);
router.post('/:id/courses/:courseId/classes', ClassController.insert);
router.put('/:id/courses/:courseId/classes/:classId', ClassController.edit);
router.delete(
	'/:id/courses/:courseId/classes/:classId',
	ClassController.delete
);

//	Courses
router.get('/:id/courses', CourseController.selectAllByProgram);
router.get('/:id/courses/:courseId', CourseController.selectByIdByProgram);
router.post('/:id/courses', CourseController.insert);

//	Programs
router.get('/', ProgramController.selectAll);
router.get('/:id', ProgramController.selectById);
router.post('/', ProgramController.insert);
router.put('/:id', ProgramController.edit);
router.delete('/:id', ProgramController.delete);

module.exports = router;
