const express = require('express');
const units = express.Router({ mergeParams: true });

const UnitController = require('../controllers/UnitController');

const UnitValidator = require('../validators/UnitValidator');

const ClassRoutes = require('./ClassRoutes');

units.use('/:unit_code/classes', UnitValidator.find, ClassRoutes);

units.get('/', UnitController.index);
units.get('/:unit_code', UnitValidator.find, UnitController.find);
units.post('/', UnitValidator.create, UnitController.store);
units.put(
	'/:unit_code',
	UnitValidator.find,
	UnitValidator.edit,
	UnitController.modify
);
units.delete('/:unit_code', UnitValidator.find, UnitController.remove);

module.exports = units;
