const express = require('express');
const comments = express.Router({ mergeParams: true });

const CommentController = require('../controllers/CommentController');

const { loginRequired } = require('../middleware/permissions');

// GET /courses/L079/units/26719/projects/2019-2020/1/teams/T001/comments
comments.get('/', loginRequired, CommentController.index);

// POST /courses/L079/units/26719/projects/2019-2020/1/teams/T001/comments
comments.post('/', loginRequired, CommentController.store);

module.exports = comments;
