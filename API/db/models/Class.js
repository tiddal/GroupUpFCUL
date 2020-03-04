const { Model, DataTypes } = require('sequelize');

class Class extends Model {
	static init(sequelize) {
		super.init(
			{
				courseId: DataTypes.INTEGER,
				number: DataTypes.STRING,
				beginsAt: DataTypes.TIME,
				endsAt: DataTypes.TIME
			},
			{
				sequelize
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
	}
}

module.exports = Class;
