const express = require('express');
const router = express.Router();
const CourseController = require('./controllers/Course');

router.get('/', CourseController.selectAll);
router.get('/:id', CourseController.selectById);
router.put('/:id', CourseController.edit);
router.delete('/:id', CourseController.delete);

module.exports = router;
