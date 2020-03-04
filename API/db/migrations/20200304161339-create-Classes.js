'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Classes', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			courseId: {
				type: Sequelize.INTEGER,
				references: { model: 'Courses', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			number: {
				type: Sequelize.STRING,
				allowNull: false
			},
			beginsAt: {
				type: Sequelize.TIME,
				allowNull: false
			},
			endsAt: {
				type: Sequelize.TIME,
				allowNull: false
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Classes');
	}
};
