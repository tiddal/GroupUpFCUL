exports.up = function (knex) {
	return knex.schema.createTable('Question', function (table) {
		table.uuid('id').primary();
		table.uuid('team_id').notNullable();
		table.uuid('user_id').notNullable();
		table.string('message').notNullable();
		table.string('role').notNullable();
		table.timestamps(true, true);
		table
			.foreign('user_id')
			.references('id')
			.inTable('User')
			.onDelete('CASCADE');
		table
			.foreign('team_id')
			.references('id')
			.inTable('Team')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('Question');
};
