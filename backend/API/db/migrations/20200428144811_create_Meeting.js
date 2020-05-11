exports.up = function (knex) {
	return knex.schema.createTable('Meeting', function (table) {
		table.uuid('id').primary();
		table.uuid('team_id').notNullable();
		table.integer('meeting_number').notNullable();
		table.string('topic').notNullable();
		table.string('begins_at').notNullable();
		table.string('ends_at').notNullable();
		table.timestamps(true, true);
		table
			.foreign('team_id')
			.references('id')
			.inTable('Team')
			.onDelete('CASCADE');
		table.unique(['meeting_number', 'team_id']);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('Meeting');
};
