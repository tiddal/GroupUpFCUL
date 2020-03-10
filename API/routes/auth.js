const express = require('express');
const router = express.Router();
const AuthController = require('./controllers/Auth');

router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

module.exports = router;
