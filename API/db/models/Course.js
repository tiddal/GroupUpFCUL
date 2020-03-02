const { Model, DataTypes } = require('sequelize');

class Course extends Model {
	static init(sequelize) {
		super.init(
			{
				code: DataTypes.STRING,
				name: DataTypes.STRING,
				description: DataTypes.STRING,
				ects: DataTypes.INTEGER
			},
			{
				sequelize
			}
		);
	}
	static associate(models) {
		this.belongsToMany(models.Program, {
			foreignKey: 'courseId',
			through: 'program_course',
			as: 'programs'
		});
	}
}

module.exports = Course;
