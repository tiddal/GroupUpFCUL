const express = require('express');
const router = express.Router();
const multer = require('multer');
const { celebrate, Segments, Joi } = require('celebrate');

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

router.get('/', UserController.index);
router.get('/:id', UserValidator.find, UserController.find);
router.post('/', UserValidator.create, UserController.store);
router.put(
	'/:id',
	UserValidator.find,
	UserValidator.edit,
	UserController.modify
);
router.delete('/:id', UserValidator.find, UserController.remove);

// const UserController = require('./controllers/User');
// const StudentController = require('./controllers/Student');
// const ProfessorController = require('./controllers/Professor');
// const AdminsController = require('./controllers/Admin');

// router.get('/students/', StudentController.selectAll);
// router.get('/students/:id', StudentController.selectById);

// router.get('/professors/', ProfessorController.selectAll);
// router.get('/professors/:id', ProfessorController.selectById);

// router.get('/admins/', AdminsController.selectAll);
// router.get('/admins/:id', AdminsController.selectById);

// router.get('/', loginRequired, adminRequired, UserController.selectAll);
// router.get('/:id', UserController.selectById);
// router.post('/', UserController.insert);
// router.put(
// 	'/:id',
// 	loginRequired,
// 	selfRequired,
// 	multer(multerConfig).single('file'),
// 	UserController.edit
// );
// router.delete('/:id', UserController.delete);

module.exports = router;
