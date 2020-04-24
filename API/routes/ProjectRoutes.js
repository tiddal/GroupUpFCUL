const express = require('express');
const projects = express.Router({ mergeParams: true });

const {
	loginRequired,
	professorRequired,
} = require('../middleware/permissions');

const ProjectController = require('../controllers/ProjectController');

const ProjectValidator = require('../validators/ProjectValidator');

const TeamRoutes = require('./TeamRoutes');

const StageRoutes = require('./StageRoutes')


projects.use('/:project_year/:project_number/teams', TeamRoutes);
projects.use('/:project_year/:project_number/stages', StageRoutes)
projects.get('/', loginRequired, ProjectController.index);
projects.get(
	'/:project_year',
	loginRequired,
	ProjectValidator.findYear,
	ProjectController.findByAcademicYear
);
projects.get(
	'/:project_year/:project_number',
	loginRequired,
	ProjectValidator.find,
	ProjectController.find
);
projects.post(
	'/',
	professorRequired,
	ProjectValidator.create,
	ProjectController.store
);
projects.put(
	'/:project_year/:project_number',
	professorRequired,
	ProjectValidator.find,
	ProjectController.modify
);
projects.delete(
	'/:project_year/:project_number',
	professorRequired,
	ProjectValidator.find,
	ProjectController.remove
);

module.exports = projects;
