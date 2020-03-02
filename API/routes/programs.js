const express = require('express');
const router = express.Router();
const ProgramController = require('./controllers/Program');
const CourseController = require('./controllers/Course');

router.get('/:id/courses', CourseController.selectAll);
router.get('/:id/courses/:courseId', CourseController.selectById);
router.post('/:id/courses', CourseController.insert);
router.put('/:id/courses/:courseId', CourseController.edit);
router.delete('/:id/courses/:courseId', CourseController.delete);

router.get('/', ProgramController.selectAll);
router.get('/:id', ProgramController.selectById);
router.post('/', ProgramController.insert);
router.put('/:id', ProgramController.edit);
router.delete('/:id', ProgramController.delete);

module.exports = router;
