const express = require('express');
const helmet = require('helmet');
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

const app = express();

app.use(helmet());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ['self']
		}
	})
);
app.use(helmet.referrerPolicy({ policy: 'origin-when-cross-origin' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
