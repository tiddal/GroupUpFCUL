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
						},
						isInt: {
							msg: 'This field must be an integer.'
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
						},
						is: {
							args: /^[a-zA-Z\u00C0-\u017F ]+$/i,
							msg: 'This field only accepts letters and spaces.'
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
						},
						isAlphanumeric: {
							msg: 'This field must be an alphanumeric.'
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
						},
						isInt: {
							msg: 'This field must be an integer.'
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
