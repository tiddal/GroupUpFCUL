const express = require('express');
const app = express();
const path = require('path');
const usersRoutes = require('./users.js');
const programsRoutes = require('./programs.js');
const coursesRoutes = require('./courses.js');
const classesRoutes = require('./classes.js');

app.use(express.json());
app.use(
	'/files',
	express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
);
app.use('/users', usersRoutes);
app.use('/programs', programsRoutes);
app.use('/courses', coursesRoutes);
app.use('/classes', classesRoutes);

module.exports = app;
