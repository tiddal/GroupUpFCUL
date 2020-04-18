exports.up = function (knex) {
	return knex.schema.createTable('class_student', function (table) {
		table.uuid('student_id');
		table.uuid('class_id');
		table
			.foreign('student_id')
			.references('user_id')
			.inTable('students')
			.onDelete('CASCADE');
		table
			.foreign('class_id')
			.references('id')
			.inTable('classes')
			.onDelete('CASCADE');
		table.primary(['student_id', 'class_id']);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('class_student');
};
