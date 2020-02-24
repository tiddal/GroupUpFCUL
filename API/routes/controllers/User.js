const User = require('../../db/models/User');

async function insertOne(req, res) {
	const {
		number,
		first_name,
		last_name,
		email,
		password,
		status,
		avatarURL
	} = req.body;
	try {
		const user = await User.create({
			number,
			first_name,
			last_name,
			email,
			password,
			status,
			avatarURL
		});
		return res.json(user);
	} catch (err) {
		return res.status(400).json({ error: 'Bad Request' });
	}
}

async function insertMany(req, res) {
	try {
		const users = await User.bulkCreate(req.body.users);
		return res.json(users);
	} catch (err) {
		return res.status(400).json({ error: 'Bad Request' });
	}
}

module.exports = {
	async selectById(req, res) {
		const user = await User.findByPk(req.params.id);
		return res.json(user);
	},

	async selectAll(req, res) {
		const users = await User.findAll();
		return res.json(users);
	},

	async insert(req, res) {
		const { option } = req.body;
		if (option === 'insert_one') {
			return insertOne(req, res);
		} else if (option === 'insert_many') {
			return insertMany(req, res);
		}
		return res.status(400).json({ error: 'Bad Request' });
	}
};
