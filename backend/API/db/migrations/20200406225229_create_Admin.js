exports.up = function (knex) {
	return knex.schema.createTable('Admin', function (table) {
		table.uuid('user_id').primary();
		table.integer('previleges').defaultTo(1).notNullable();
		table
			.foreign('user_id')
			.references('id')
			.inTable('User')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('Admin');
};
