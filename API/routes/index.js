const express = require('express');
const app = express();
const usersRoutes = require('./users.js');

app.use(express.json());
app.use('/users', usersRoutes);

// router.get('/users', async (req, res, next) => {
// 	try {
// 		let results = await db.users.all();
// 		res.json(results);
// 	} catch (err) {
// 		console.log(err);
// 		res.sendStatus(500);
// 	}
// });

// router.get('/users/:id', async (req, res, next) => {
// 	try {
// 		let results = await db.users.byId(req.params.id);
// 		res.json(results);
// 	} catch (err) {
// 		console.log(err);
// 		res.sendStatus(500);
// 	}
// });

module.exports = app;
