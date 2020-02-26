const { Model } = require('sequelize');

class Student extends Model {
	static init(sequelize) {
		super.init({}, { sequelize });
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
	}
}

module.exports = Student;
