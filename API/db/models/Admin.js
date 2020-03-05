const { Model } = require('sequelize');

class Admin extends Model {
	static init(sequelize) {
		super.init(
			{},
			{
				hooks: {
					afterCreate: (admin) => {
						admin.dataValues.id = undefined;
						admin.dataValues.createdAt = undefined;
						admin.dataValues.updatedAt = undefined;
						return admin;
					}
				},
				sequelize
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
	}
}

module.exports = Admin;
