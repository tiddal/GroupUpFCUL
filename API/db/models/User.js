const { Model, DataTypes } = require('sequelize');

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				number: DataTypes.STRING,
				firstName: DataTypes.STRING,
				lastName: DataTypes.STRING,
				email: DataTypes.STRING,
				password: DataTypes.STRING,
				status: DataTypes.STRING,
				avatarURL: DataTypes.STRING
			},
			{
				sequelize
			}
		);
	}
}

module.exports = User;
