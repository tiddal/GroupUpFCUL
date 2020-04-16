exports.up = function (knex) {
	return knex.schema.createTable('students', function (table) {
		table.string('username').primary();
		table.boolean('working_student').defaultTo(false).notNullable();
		table.string('github_url');
		table.string('facebook_url');
		table.string('instagram_url');
		table.string('twitter_url');
		table
			.foreign('username')
			.references('username')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('students');
};
