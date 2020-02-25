const User = require('../../db/models/User');

const error = (res, code) => {
	const codes = {
		400: 'Bad Request',
		404: 'Not Found',
		500: 'Server Error'
	};
	return res.status(code).json({ message: codes[code] });
};

const insertOne = (req, res) => {
	const { number, firstName, lastName, email, password } = req.body.user;
	User.create({ number, firstName, lastName, email, password })
		.then((user) => res.json(user))
		.catch((err) => error(res, 400));
};

const insertMany = (req, res) =>
	User.bulkCreate(req.body.users)
		.then((users) => res.json(users))
		.catch((err) => error(res, 400));

module.exports.selectById = (req, res) =>
	User.findByPk(req.params.id)
		.then((user) => (user ? res.json(user) : error(res, 404)))
		.catch((err) => error(res, 500));

module.exports.selectAll = (req, res) =>
	User.findAll()
		.then((users) => res.json(users))
		.catch((err) => error(res, 500));

module.exports.insert = (req, res) => {
	const { action } = req.body;
	if (action === 'insert_one') {
		return insertOne(req, res);
	} else if (action === 'insert_many') {
		return insertMany(req, res);
	}
	return error(res, 400);
};

module.exports.edit = (req, res) =>
	User.findByPk(req.params.id)
		.then((user) =>
			user
				? user
						.update(req.body.user)
						.then((updatedUser) => res.json(updatedUser))
				: error(res, 404)
		)
		.catch((err) => error(res, 500));
