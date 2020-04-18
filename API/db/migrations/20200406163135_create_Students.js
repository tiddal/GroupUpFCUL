exports.up = function (knex) {
	return knex.schema.createTable('students', function (table) {
		table.uuid('user_id').primary();
		table.boolean('working_student').defaultTo(false).notNullable();
		table.string('github_url');
		table.string('facebook_url');
		table.string('instagram_url');
		table.string('twitter_url');
		table
			.foreign('user_id')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('students');
};
