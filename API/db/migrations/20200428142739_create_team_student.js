exports.up = function (knex) {
	return knex.schema.createTable('team_student', function (table) {
		table.uuid('team_id');
		table.uuid('student_id');
		table.string('role').notNullable();
		table
			.foreign('team_id')
			.references('id')
			.inTable('Team')
			.onDelete('CASCADE');
		table
			.foreign('student_id')
			.references('user_id')
			.inTable('Student')
			.onDelete('CASCADE');
		table.primary(['team_id', 'student_id']);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('team_student');
};
