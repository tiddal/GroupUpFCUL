const express = require('express');
const app = express();
const usersRoutes = require('./users.js');
const programsRoutes = require("./programs.js");

app.use(express.json());
app.use('/users', usersRoutes);
app.use("/programs", programsRoutes);

module.exports = app;
