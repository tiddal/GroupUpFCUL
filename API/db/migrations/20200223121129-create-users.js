'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER(11).ZEROFILL.UNSIGNED,
				primaryKey: true,
				autoIncrement: true
			},
			number: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			first_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			last_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			status: {
				type: Sequelize.STRING
			},
			avatarURL: {
				type: Sequelize.STRING
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users');
	}
};
