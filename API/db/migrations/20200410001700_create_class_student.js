exports.up = function (knex) {
	return knex.schema.createTable('class_student', function (table) {
		table.string('student_username');
		table.string('class_id');
		table
			.foreign('student_username')
			.references('username')
			.inTable('students')
			.onDelete('CASCADE');
		table
			.foreign('class_id')
			.references('id')
			.inTable('classes')
			.onDelete('CASCADE');
		table.primary(['student_username', 'class_id']);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('class_student');
};
