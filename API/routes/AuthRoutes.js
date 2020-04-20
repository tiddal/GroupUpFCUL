const express = require('express');
const auth = express.Router();
const AuthController = require('../controllers/AuthController');

const AuthValidator = require('../validators/AuthValidator');

auth.post('/', AuthValidator.login, AuthController.login);

module.exports = auth;
