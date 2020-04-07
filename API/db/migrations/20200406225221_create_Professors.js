exports.up = function (knex) {
	return knex.schema.createTable('professors', function (table) {
		table.string('username').primary();
		table.string('room');
		table.string('department');
		table
			.foreign('username')
			.references('username')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('professors');
};
