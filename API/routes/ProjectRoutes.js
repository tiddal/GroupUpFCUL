const express = require('express');
const projects = express.Router({ mergeParams: true });

const ProjectController = require('../controllers/ProjectController');

const ProjectValidator = require('../validators/ProjectValidator');

const TeamRoutes = require('./TeamRoutes');

projects.use('/:project_year/:project_number/teams', TeamRoutes);

projects.get('/', ProjectController.index);
projects.get('/:project_year');
projects.get('/:project_year/:project_number');
projects.post('/', ProjectValidator.create, ProjectController.store);
projects.put('/:project_year/:project_number');
projects.delete('/:project_year/:project_number');

module.exports = projects;
