const { Model, DataTypes } = require('sequelize');

class Course extends Model {
	static init(sequelize) {
		super.init(
			{
				code: {
					type: DataTypes.INTEGER,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: 'This field cannot be empty.'
						},
						notNull: {
							msg: 'This field is required.'
						}
					}
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: 'This field cannot be empty.'
						},
						notNull: {
							msg: 'This field is required.'
						}
					}
				},
				initials: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: 'This field cannot be empty.'
						},
						notNull: {
							msg: 'This field is required.'
						}
					}
				},
				ects: {
					type: DataTypes.INTEGER,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: 'This field cannot be empty.'
						},
						notNull: {
							msg: 'This field is required.'
						}
					}
				}
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
