'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('program_course', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			programId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Programs', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			courseId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Courses', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('program_course');
	}
};
