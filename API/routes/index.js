const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//	Middleware
const sessions = require('../middleware/sessions');
const { sessionRequired } = require('../middleware/permissions');
const errorHandler = require('../middleware/errorHandler');

//	Routes
const usersRoutes = require('./users');
const programsRoutes = require('./programs');
const coursesRoutes = require('./courses');
const classesRoutes = require('./classes');
const authRoutes = require('./auth');
const pageNotFound = require('./pageNotFound');

app.use(express.json());
app.use(morgan('dev'));
app.use(sessions);
app.use(sessionRequired);

app.use(
	'/files',
	express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
);
app.use('/users', usersRoutes);
app.use('/programs', programsRoutes);
app.use('/courses', coursesRoutes);
app.use('/classes', classesRoutes);
app.use('/', authRoutes);
app.use(pageNotFound);

app.use(errorHandler);

module.exports = app;
