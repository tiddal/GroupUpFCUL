exports.up = function (knex) {
	return knex.schema.createTable('Comment', function (table) {
		table.uuid('id').primary();
		table.uuid('team_id').notNullable();
		table.uuid('student_id').notNullable();
		table.string('message').notNullable();
		table.timestamps(true, true);
		table
			.foreign('student_id')
			.references('user_id')
			.inTable('Student')
			.onDelete('CASCADE');
		table
			.foreign('team_id')
			.references('id')
			.inTable('Team')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('Comment');
};
