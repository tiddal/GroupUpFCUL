'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			'Classes',
			{
				id: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
					primaryKey: true
				},
				courseId: {
					type: Sequelize.INTEGER,
					references: { model: 'Courses', key: 'id' },
					unique: 'actions_unique',
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE'
				},
				number: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: 'actions_unique'
				},
				beginsAt: {
					type: Sequelize.TIME,
					allowNull: false
				},
				endsAt: {
					type: Sequelize.TIME,
					allowNull: false
				},
				weekDay: {
					type: Sequelize.INTEGER,
					allowNull: false
				},
				room: {
					type: Sequelize.STRING
				},
				academicYear: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: 'actions_unique'
				},
				createdAt: Sequelize.DATE,
				updatedAt: Sequelize.DATE
			},
			{
				uniqueKeys: {
					actions_unique: {
						fields: ['courseId', 'number', 'academicYear']
					}
				}
			}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Classes');
	}
};
