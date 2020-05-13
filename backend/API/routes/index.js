const express = require('express');
const path = require('path');
const router = express.Router();

//	Routes
const UserRoutes = require('./UserRoutes');
const AuthRoutes = require('./AuthRoutes');
const CourseRoutes = require('./CourseRoutes');

const PageNotFound = require('./PageNotFound');

router.use(
	'/files',
	express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
);
router.use('/users', UserRoutes);
router.use('/authenticate', AuthRoutes);
router.use('/courses', CourseRoutes);
router.use('/', (request, response) => response.json({ status: 'healthy' }));

router.use(PageNotFound);

module.exports = router;
