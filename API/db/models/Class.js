const { Model, DataTypes } = require('sequelize');

class Class extends Model {
	static init(sequelize) {
		super.init(
			{
				courseId: DataTypes.INTEGER,
				number: DataTypes.STRING,
                beginsAt: DataTypes.DATE,
                endsAt: DataTypes.DATE
			},
			{
				sequelize
			}
		);
	}
}

module.exports = Class;
