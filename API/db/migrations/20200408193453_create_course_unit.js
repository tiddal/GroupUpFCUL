exports.up = function (knex) {
	return knex.schema.createTable('course_unit', function (table) {
		table.uuid('course_id');
		table.uuid('unit_id');
		table
			.foreign('course_id')
			.references('id')
			.inTable('Course')
			.onDelete('CASCADE');
		table
			.foreign('unit_id')
			.references('id')
			.inTable('Unit')
			.onDelete('CASCADE');
		table.primary(['course_id', 'unit_id']);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('course_unit');
};
