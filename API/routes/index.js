const express = require('express');
const path = require('path');
const morgan = require('morgan');

//	Middleware
const helmet = require('../middleware/helmet');
const cors = require('../middleware/cors');
const sessions = require('../middleware/sessions');
const { sessionRequired } = require('../middleware/permissions');
const errorHandler = require('../middleware/errorHandler');
const { errors } = require('celebrate');

//	Routes
const userRoutes = require('./UserRoutes');
const programsRoutes = require('./programs');
const coursesRoutes = require('./courses');
const classesRoutes = require('./classes');
const authRoutes = require('./auth');
const pageNotFound = require('./pageNotFound');

const app = express();

app.use(cors);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(sessions);
app.use(sessionRequired);

app.use(
	'/files',
	express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
);
app.use('/users', userRoutes);
app.use('/programs', programsRoutes);
app.use('/courses', coursesRoutes);
app.use('/classes', classesRoutes);
app.use('/', authRoutes);
app.use(pageNotFound);
app.use(errors());

app.use(errorHandler);

module.exports = app;
