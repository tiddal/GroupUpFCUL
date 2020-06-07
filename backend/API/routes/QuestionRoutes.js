const express = require('express');
const questions = express.Router({ mergeParams: true });

const QuestionController = require('../controllers/QuestionController');

const { loginRequired } = require('../middleware/permissions');

// GET /courses/L079/units/26719/projects/2019-2020/1/teams/T001/comments
questions.get('/', loginRequired, QuestionController.index);

// POST /courses/L079/units/26719/projects/2019-2020/1/teams/T001/comments
questions.post('/', loginRequired, QuestionController.store);

module.exports = questions;
