const express = require('express');
const app = express();
const path = require('path');
const usersRoutes = require('./users.js');

app.use(express.json());
app.use(
	'/files',
	express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
);
app.use('/users', usersRoutes);

module.exports = app;
