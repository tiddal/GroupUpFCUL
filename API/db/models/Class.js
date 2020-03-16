const { Model, DataTypes } = require('sequelize');

class Class extends Model {
	static init(sequelize) {
		super.init(
			{
				courseId: {
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
				number: {
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
				beginsAt: {
					type: DataTypes.TIME,
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
				endsAt: {
					type: DataTypes.TIME,
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
				weekDay: {
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
						},
						min: {
							args: 1,
							msg: 'Must be between 1 and 7.'
						},
						max: {
							args: 7,
							msg: 'Must be between 1 and 7.'
						}
					}
				},
				room: {
					type: DataTypes.STRING
				},
				academicYear: {
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
				}
			},
			{
				sequelize
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
		this.belongsToMany(models.Professor, {
			foreignKey: 'classId',
			through: 'class_professor',
			as: 'professors'
		});
		this.belongsToMany(models.Student, {
			foreignKey: 'classId',
			through: 'class_student',
			as: 'students'
		});
	}
}

module.exports = Class;
