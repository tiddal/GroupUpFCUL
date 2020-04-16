exports.up = function (knex) {
	return knex.schema.createTable('admins', function (table) {
		table.string('username').primary();
		table.integer('previleges').defaultTo(1).notNullable();
		table
			.foreign('username')
			.references('username')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('admins');
};
