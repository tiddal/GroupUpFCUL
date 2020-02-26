const { Model, DataTypes } = require('sequelize');

class Professor extends Model {
	static init(sequelize) {
		super.init(
			{
				department: DataTypes.STRING,
				room: DataTypes.STRING
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
	}
}

module.exports = Professor;
