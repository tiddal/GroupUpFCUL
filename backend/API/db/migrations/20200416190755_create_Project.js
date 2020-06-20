exports.up = function (knex) {
	return knex.schema.createTable('Project', function (table) {
		table.uuid('id').primary();
		table.integer('number').notNullable();
		table.uuid('unit_id').notNullable();
		table.string('academic_year').notNullable();
		table.string('name').notNullable();
		table.integer('min_students').notNullable();
		table.integer('max_students').notNullable();
		table.string('description');
		table.string('objectives').notNullable();
		table.timestamps(true, true);
		table.unique(['number', 'unit_id', 'academic_year']);
		table
			.foreign('unit_id')
			.references('id')
			.inTable('Unit')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('Project');
};
