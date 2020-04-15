exports.up = function (knex) {
	return knex.schema.createTable('courses', function (table) {
		table.uuid('id').primary();
		table.string('code').unique().notNullable();
		table.string('name').notNullable();
		table.integer('cycle').notNullable();
		table.string('initials').notNullable();
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('courses');
};
