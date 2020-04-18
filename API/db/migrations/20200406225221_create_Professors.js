exports.up = function (knex) {
	return knex.schema.createTable('professors', function (table) {
		table.uuid('user_id').primary();
		table.string('room');
		table.string('department');
		table
			.foreign('user_id')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('professors');
};
