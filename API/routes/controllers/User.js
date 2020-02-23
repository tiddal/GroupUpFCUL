const User = require('../../db/models/User');

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
		const { name } = req.body;
		const user = await User.create({ name });
		return res.json(user);
	}
};
