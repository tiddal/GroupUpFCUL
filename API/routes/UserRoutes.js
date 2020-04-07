const express = require('express');
const users = express.Router();
const multer = require('multer');

//  Middleware
const multerConfig = require('../middleware/multer');
const {
	loginRequired,
	adminRequired,
	selfRequired,
} = require('../middleware/permissions');

//	Validators
const UserValidator = require('../validators/UserValidator');

//  Controllers
const UserController = require('../controllers/UserController');

//	Routes
const StudentsRoutes = require('./StudentsRoutes');
const ProfessorsRoutes = require('./ProfessorsRoutes');
const AdminsRoutes = require('./AdminsRoutes');

users.use('/students', StudentsRoutes);
users.use('/professors', ProfessorsRoutes);
users.use('/admins', AdminsRoutes);
users.get('/', UserController.index);
users.get('/:username', UserValidator.find, UserController.find);
users.post('/', UserValidator.create, UserController.store);
users.put(
	'/:username',
	UserValidator.find,
	UserValidator.edit,
	UserController.modify
);
users.delete('/:username', UserValidator.find, UserController.remove);

// const ProfessorController = require('./controllers/Professor');

// router.get('/professors/', ProfessorController.selectAll);
// router.get('/professors/:id', ProfessorController.selectById);

// router.put(
// 	'/:id',
// 	loginRequired,
// 	selfRequired,
// 	multer(multerConfig).single('file'),
// 	UserController.edit
// );
// router.delete('/:id', UserController.delete);

module.exports = users;
