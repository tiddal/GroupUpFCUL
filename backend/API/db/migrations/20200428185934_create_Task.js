exports.up = function (knex) {
	return knex.schema.createTable('Task', function (table) {
		table.uuid('id').primary();
		table.uuid('team_id').notNullable();
		table.string('task_number').notNullable();
		table.string('title').notNullable();
		table.string('description');
		table.uuid('performed_by');
		table.integer('time');
		table.timestamps(true, true);
		table
			.foreign('performed_by')
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
	return knex.schema.dropTable('Task');
};
