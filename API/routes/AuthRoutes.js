const express = require('express');
const auth = express.Router();
const AuthController = require('../controllers/AuthController');

const AuthValidator = require('../validators/AuthValidator');

auth.post('/login', AuthValidator.login, AuthController.login);
auth.get('/logout', AuthController.logout);
auth.get('/me', AuthValidator.cookie, AuthController.me);

module.exports = auth;
