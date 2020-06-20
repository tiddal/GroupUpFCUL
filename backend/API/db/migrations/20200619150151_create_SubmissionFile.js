exports.up = function (knex) {
	return knex.schema.createTable('SubmissionFile', function (table) {
		table.uuid('id').primary();
		table.uuid('stage_id');
		table.uuid('team_id');
		table.uuid('user_id');
		table.string('filename').notNullable();
		table.string('original_filename').notNullable();
		table.string('submission_url').notNullable();
		table.timestamps(true, true);
		table
			.foreign('stage_id')
			.references('id')
			.inTable('Stage')
			.onDelete('CASCADE');
		table
			.foreign('team_id')
			.references('id')
			.inTable('Team')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('SubmissionFile');
};
