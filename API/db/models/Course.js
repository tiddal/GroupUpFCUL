const { Model, DataTypes } = require('sequelize');

class Course extends Model {
	static init(sequelize) {
		super.init(
			{
                name: DataTypes.STRING,
                description: DataTypes.STRING,
                ects: DataTypes.INTEGER
			},
			{
				sequelize
			}
		);
    }
    //static associate(models) {
       // this.belongsToMany(models.Program, {through: "programCourses" });
	//}
}

module.exports = Course;
