exports.up = function (knex) {
	return knex.schema.createTable('Stage', function (table) {
		table.uuid('id').primary();
		table.uuid('project_id').notNullable();
		table.string('stage_number').notNullable();
		table.string('description');
		table.timestamp('start_date').notNullable();
		table.timestamp('end_date').notNullable();
		table.string('weight').notNullable();
		table.timestamps(true, true);
		table.unique(['project_id', 'stage_number']);
		table
			.foreign('project_id')
			.references('id')
			.inTable('Project')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('Stage');
};
