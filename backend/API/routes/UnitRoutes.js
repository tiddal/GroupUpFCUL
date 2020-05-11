const express = require('express');
const units = express.Router({ mergeParams: true });

const {
	loginRequired,
	selfRequired,
	adminRequired,
} = require('../middleware/permissions');

const UnitController = require('../controllers/UnitController');

const UnitValidator = require('../validators/UnitValidator');

const ClassRoutes = require('./ClassRoutes');
const ProjectRoutes = require('./ProjectRoutes');

units.use('/:unit_code/classes', UnitValidator.find, ClassRoutes);
units.use('/:unit_code/projects', UnitValidator.find, ProjectRoutes);

units.get('/', loginRequired, UnitController.index);
units.get(
	'/:unit_code',
	loginRequired,
	UnitValidator.find,
	UnitController.find
);
units.post('/', adminRequired, UnitValidator.create, UnitController.store);
units.put(
	'/:unit_code',
	adminRequired,
	UnitValidator.find,
	UnitValidator.edit,
	UnitController.modify
);
units.delete(
	'/:unit_code',
	adminRequired,
	UnitValidator.find,
	UnitController.remove
);

module.exports = units;
