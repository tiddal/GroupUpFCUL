exports.up = function (knex) {
	return knex.schema.createTable('class_professor', function (table) {
		table.string('professor_username');
		table.string('class_id');
		table
			.foreign('professor_username')
			.references('username')
			.inTable('professors')
			.onDelete('CASCADE');
		table
			.foreign('class_id')
			.references('id')
			.inTable('classes')
			.onDelete('CASCADE');
		table.primary(['professor_username', 'class_id']);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('class_professor');
};
