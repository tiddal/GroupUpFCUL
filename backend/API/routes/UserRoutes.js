const express = require('express');
const users = express.Router();
const multer = require('multer');

//  Middleware
const multerConfig = require('../middleware/multer');
const {
	sessionRequired,
	loginRequired,
	adminRequired,
	selfRequired,
} = require('../middleware/permissions');

//	Validators
const UserValidator = require('../validators/UserValidator');

//  Controllers
const UserController = require('../controllers/UserController');

//	Routes
const StudentRoutes = require('./StudentRoutes');
const ProfessorRoutes = require('./ProfessorRoutes');
const AdminRoutes = require('./AdminRoutes');

users.use('/students', StudentRoutes);
users.use('/professors', ProfessorRoutes);
users.use('/admins', AdminRoutes);

users.get('/', adminRequired, UserController.index);
users.get('/:username', UserValidator.find, UserController.find);
users.post('/', adminRequired, UserValidator.create, UserController.store);
users.put(
	'/:username',
	adminRequired,
	UserValidator.find,
	UserValidator.edit,
	UserController.modify
);
users.delete(
	'/:username',
	adminRequired,
	UserValidator.find,
	UserController.remove
);

// router.put(
// 	'/:id',
// 	loginRequired,
// 	selfRequired,
// 	multer(multerConfig).single('file'),
// 	UserController.edit
// );
// router.delete('/:id', UserController.delete);

module.exports = users;
