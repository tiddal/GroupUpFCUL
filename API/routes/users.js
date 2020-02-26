const express = require('express');
const router = express.Router();
const UserController = require('./controllers/User');
const StudentController = require('./controllers/Student');
const ProfessorController = require('./controllers/Professor');
const AdminsController = require('./controllers/Admin');

router.get('/students/', StudentController.selectAll);
router.get('/students/:id', StudentController.selectById);

router.get('/professors/', ProfessorController.selectAll);
router.get('/professors/:id', ProfessorController.selectById);

router.get('/admins/', AdminsController.selectAll);
router.get('/admins/:id', AdminsController.selectById);

router.get('/', UserController.selectAll);
router.get('/:id', UserController.selectById);
router.post('/', UserController.insert);
router.put('/:id', UserController.edit);
router.delete('/:id', UserController.delete);

module.exports = router;
