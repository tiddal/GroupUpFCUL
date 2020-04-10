exports.up = function (knex) {
	return knex.schema.createTable('classes', function (table) {
		table.string('id').primary();
		table.integer('unit_code').notNullable();
		table.string('number').notNullable();
		table.time('begins_at').notNullable();
		table.time('ends_at').notNullable();
		table.integer('week_day').notNullable();
		table.string('academic_year').notNullable();
		table.timestamps(true, true);
		table.unique(['unit_code', 'number', 'academic_year']);
		table
			.foreign('unit_code')
			.references('code')
			.inTable('units')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('classes');
};
