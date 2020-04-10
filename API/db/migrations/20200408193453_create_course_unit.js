exports.up = function (knex) {
	return knex.schema.createTable('course_unit', function (table) {
		table.string('course_code');
		table.integer('unit_code');
		table
			.foreign('course_code')
			.references('code')
			.inTable('courses')
			.onDelete('CASCADE');
		table
			.foreign('unit_code')
			.references('code')
			.inTable('units')
			.onDelete('CASCADE');
		table.primary(['course_code', 'unit_code']);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('course_unit');
};
