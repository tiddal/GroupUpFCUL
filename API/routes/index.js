const express = require('express');
const path = require('path');
const router = express.Router();

//	Routes
const userRoutes = require('./UserRoutes');
const programsRoutes = require('./programs');
const coursesRoutes = require('./courses');
const classesRoutes = require('./classes');
const authRoutes = require('./auth');
const pageNotFound = require('./pageNotFound');

router.use(
	'/files',
	express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
);
router.use('/users', userRoutes);
router.use('/programs', programsRoutes);
router.use('/courses', coursesRoutes);
router.use('/classes', classesRoutes);
router.use('/', authRoutes);
router.use(pageNotFound);

module.exports = router;
