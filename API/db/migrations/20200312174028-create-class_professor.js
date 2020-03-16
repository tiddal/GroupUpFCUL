'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('class_professor', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			classId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Classes', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			professorId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Classes', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('class_professor');
	}
};
