exports.up = function (knex) {
	return knex.schema.createTable('User', function (table) {
		table.uuid('id').primary();
		table.string('username').unique().notNullable();
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.string('email').unique().notNullable();
		table.string('password').notNullable();
		table.string('about');
		table.string('status').defaultTo('offline').notNullable();
		table.string('avatar_url');
		table.string('avatar_key');
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('User');
};
