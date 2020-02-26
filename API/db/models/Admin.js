const { Model } = require('sequelize');

class Admin extends Model {
	static init(sequelize) {
		super.init({}, { sequelize });
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
	}
}

module.exports = Admin;
