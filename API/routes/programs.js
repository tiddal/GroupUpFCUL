const express = require('express');
const router = express.Router();
const ProgramController = require('./controllers/Program');
const CourseController = require('./controllers/Course');

router.get('/:id/courses', CourseController.selectAllByProgram);
router.get('/:id/courses/:courseId', CourseController.selectByIdByProgram);
router.post('/:id/courses', CourseController.insert);

router.get('/', ProgramController.selectAll);
router.get('/:id', ProgramController.selectById);
router.post('/', ProgramController.insert);
router.put('/:id', ProgramController.edit);
router.delete('/:id', ProgramController.delete);

module.exports = router;
