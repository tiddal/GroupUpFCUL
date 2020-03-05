const express = require('express');
const app = express();
const path = require('path');

//	Middleware
const sessions = require('../middleware/sessions');
const { sessionRequired } = require('../middleware/permissions');

//	Routes
const usersRoutes = require('./users');
const programsRoutes = require('./programs');
const coursesRoutes = require('./courses');
const classesRoutes = require('./classes');
const authRoutes = require('./auth');

app.use(express.json());
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

module.exports = app;
