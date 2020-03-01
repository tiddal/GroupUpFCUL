const express = require('express');
const app = express();
const usersRoutes = require('./users.js');
const programsRoutes = require("./programs.js");
const coursesRoutes = require("./courses.js");

app.use(express.json());
app.use('/users', usersRoutes);
app.use("/programs", programsRoutes);
app.use("/courses", coursesRoutes);

module.exports = app;
