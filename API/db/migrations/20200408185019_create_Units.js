exports.up = function (knex) {
	return knex.schema.createTable('units', function (table) {
		table.uuid('id').primary();
		table.integer('code').unique().notNullable();
		table.string('name').notNullable();
		table.integer('semester').notNullable();
		table.string('initials').notNullable();
		table.integer('ects').notNullable();
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('units');
};
