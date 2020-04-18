exports.up = function (knex) {
	return knex.schema.createTable('Team', function (table) {
		table.uuid('id').primary();
		table.uuid('project_id').notNullable();
		table.string('team_number').notNullable();
		table.string('name');
		table.string('description');
		table.string('logo_url');
		table.string('academic_year').notNullable();
		table.timestamps(true, true);
		table.unique(['project_id', 'team_number']);
		table
			.foreign('project_id')
			.references('id')
			.inTable('Project')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('Team');
};
