const { Model, DataTypes } = require('sequelize');

class Program extends Model {
	static init(sequelize) {
		super.init(
			{
                name: DataTypes.STRING,
                cycle: DataTypes.INTEGER,
                description: DataTypes.STRING
			},
			{
				sequelize
			}
		);
	}
}

module.exports = User;
