exports.up = function (knex) {
	return knex.schema.createTable('team_ratings', function (table) {
		table.uuid('team_id');
		table.uuid('member_id');
		table.uuid('member_rated_id');
		table.integer('rate').defaultTo(0).notNullable();
		table
			.foreign('team_id')
			.references('id')
			.inTable('Team')
			.onDelete('CASCADE');
		table
			.foreign('member_id')
			.references('user_id')
			.inTable('Student')
			.onDelete('CASCADE');
		table
			.foreign('member_rated_id')
			.references('user_id')
			.inTable('Student')
			.onDelete('CASCADE');
		table.primary(['team_id', 'member_id', 'member_rated_id']);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('team_ratings');
};
