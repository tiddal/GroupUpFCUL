exports.up = function (knex) {
	return knex.schema.createTable('class_professor', function (table) {
		table.uuid('professor_id');
		table.uuid('class_id');
		table
			.foreign('professor_id')
			.references('user_id')
			.inTable('professors')
			.onDelete('CASCADE');
		table
			.foreign('class_id')
			.references('id')
			.inTable('classes')
			.onDelete('CASCADE');
		table.primary(['professor_id', 'class_id']);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('class_professor');
};
