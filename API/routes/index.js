const express = require('express');
const app = express();
const usersRoutes = require('./users.js');

app.use(express.json());
app.use('/users', usersRoutes);

module.exports = app;
