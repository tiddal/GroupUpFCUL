exports.up = function (knex) {
	return knex.schema.createTable('admins', function (table) {
		table.uuid('user_id').primary();
		table.integer('previleges').defaultTo(1).notNullable();
		table
			.foreign('user_id')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('admins');
};
