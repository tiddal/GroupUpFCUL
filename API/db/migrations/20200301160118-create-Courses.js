'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Courses', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			code: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			initials: {
				type: Sequelize.STRING
			},
			ects: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Courses');
	}
};
