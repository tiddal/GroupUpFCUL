exports.up = function (knex) {
	return knex.schema.createTable('Class', function (table) {
		table.uuid('id').primary();
		table.uuid('unit_id').notNullable();
		table.string('number').notNullable();
		table.time('begins_at').notNullable();
		table.time('ends_at').notNullable();
		table.integer('week_day').notNullable();
		table.string('academic_year').notNullable();
		table.timestamps(true, true);
		table.unique(['unit_id', 'number', 'academic_year']);
		table
			.foreign('unit_id')
			.references('id')
			.inTable('Unit')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('Class');
};
