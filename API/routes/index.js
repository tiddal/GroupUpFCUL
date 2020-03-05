const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

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

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.title = 'Not found';
	error.status = 404;
	error.detail = "Sorry, we can't find the page you were looking for";
	next(error);
});

app.use((error, req, res, next) => {
	const { title, status, detail } = error;
	res.status(status);
	res.json({ error });
});

module.exports = app;
