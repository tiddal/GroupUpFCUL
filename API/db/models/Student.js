const { Model } = require('sequelize');

class Student extends Model {
	static init(sequelize) {
		super.init(
			{},
			{
				hooks: {
					afterCreate: (student) => {
						student.dataValues.id = undefined;
						student.dataValues.createdAt = undefined;
						student.dataValues.updatedAt = undefined;
						return student;
					}
				},
				sequelize
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
		this.belongsToMany(models.Class, {
			foreignKey: 'studentId',
			through: 'class_student',
			as: 'classes'
		});
	}
}

module.exports = Student;
