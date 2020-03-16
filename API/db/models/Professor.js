const { Model, DataTypes } = require('sequelize');

class Professor extends Model {
	static init(sequelize) {
		super.init(
			{
				department: DataTypes.STRING,
				room: DataTypes.STRING
			},
			{
				hooks: {
					afterCreate: (professor) => {
						professor.dataValues.id = undefined;
						professor.dataValues.createdAt = undefined;
						professor.dataValues.updatedAt = undefined;
						return professor;
					}
				},
				sequelize
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
		this.belongsToMany(models.Class, {
			foreignKey: 'professorId',
			through: 'class_professor',
			as: 'classes'
		});
	}
}

module.exports = Professor;
