const { Model, DataTypes } = require('sequelize');

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: DataTypes.UUID,
					primaryKey: true,
					defaultValue: DataTypes.UUIDV4
				},
				name: DataTypes.STRING
			},
			{
				sequelize
			}
		);
	}
}

module.exports = User;
