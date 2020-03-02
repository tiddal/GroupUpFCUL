'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Programs', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			cycle: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			description: {
				type: Sequelize.STRING
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Programs');
	}
};
