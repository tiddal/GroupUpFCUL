const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		let results = await db.users.all();
		res.json(results);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		let results = await db.users.byId(req.params.id);
		res.json(results);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

module.exports = router;
