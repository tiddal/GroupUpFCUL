const { Model, DataTypes } = require('sequelize');

class Program extends Model {
	static init(sequelize) {
		super.init(
			{
				code: {
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
				cycle: {
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
				}
			},
			{
				sequelize
			}
		);
	}
	static associate(models) {
		this.belongsToMany(models.Course, {
			foreignKey: 'programId',
			through: 'program_course',
			as: 'courses'
		});
	}
}

module.exports = Program;
