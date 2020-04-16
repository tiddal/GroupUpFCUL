exports.up = function (knex) {
	return knex.schema.createTable('projects', function (table) {
		table.uuid('id').primary();
		table.integer('number').notNullable();
		table.integer('unit_code').notNullable();
		table.string('academic_year').notNullable();
		table.string('name').notNullable();
		table.integer('min_students').notNullable();
		table.integer('max_students').notNullable();
		table.string('description');
		table.string('objectives').notNullable();
		table.string('assignment_url').notNullable();
		table.timestamps(true, true);
		table.unique(['number', 'unit_code', 'academic_year']);
		table
			.foreign('unit_code')
			.references('code')
			.inTable('units')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('projects');
};
