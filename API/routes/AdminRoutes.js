const express = require('express');
const admins = express.Router();

const {
	adminRequired,
	loginRequired,
	selfRequired,
} = require('../middleware/permissions');

const AdminController = require('../controllers/AdminController');

const UserValidator = require('../validators/UserValidator');
const AdminValidator = require('../validators/AdminValidator');

admins.get('/', adminRequired, AdminController.index);
admins.get(
	'/:username',
	loginRequired,
	UserValidator.find,
	AdminController.find
);
admins.put(
	'/:username',
	selfRequired,
	UserValidator.find,
	AdminValidator.edit,
	AdminController.modify
);

module.exports = admins;
