const express = require('express');
const path = require('path');
const router = express.Router();

//	Routes
const UserRoutes = require('./UserRoutes');
const AuthRoutes = require('./AuthRoutes');
const programsRoutes = require('./programs');
const coursesRoutes = require('./courses');
const classesRoutes = require('./classes');

const pageNotFound = require('./pageNotFound');

router.use(
	'/files',
	express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
);
router.use('/users', UserRoutes);
router.use('/auth', AuthRoutes);

router.use('/programs', programsRoutes);
router.use('/courses', coursesRoutes);
router.use('/classes', classesRoutes);

router.use(pageNotFound);

module.exports = router;
