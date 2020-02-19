const express = require('express');
const db = require('../db');
const router = express.Router();
const { getAll, getById } = require('./utils');

router.get('/', (req, res) => getAll(db.users, res));
router.get('/:id', (req, res) => getById(db.users, req.params.id, res));

module.exports = router;
