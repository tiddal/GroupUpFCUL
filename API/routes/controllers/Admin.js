const Admin = require('../../db/models/Admin');
const { status } = require('./utils');

module.exports = {
	selectAll: (req, res) => {
		Admin.findAll()
			.then((admins) => res.json(admins))
			.catch((err) => status(res, 500));
	},

	selectById: (req, res) => {
		Admin.findOne({ where: { userId: req.params.id } })
			.then((admin) => (admin ? res.json(admin) : status(res, 404)))
			.catch((err) => status(res, 500));
	}
};
