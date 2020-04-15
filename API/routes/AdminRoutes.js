const express = require('express');
const admins = express.Router();

const AdminController = require('../controllers/AdminController');

const UserValidator = require('../validators/UserValidator');
const AdminValidator = require('../validators/AdminValidator');

admins.get('/', AdminController.index);
admins.get('/:username', UserValidator.find, AdminController.find);
admins.put(
	'/:username',
	UserValidator.find,
	AdminValidator.edit,
	AdminController.modify
);

module.exports = admins;
