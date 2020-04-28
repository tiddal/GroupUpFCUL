exports.up = function (knex) {
  return knex.schema.createTable("meeting_student", function (table) {
    table.uuid("meeting_id");
    table.uuid("student_id");
    table
      .foreign("meeting_id")
      .references("id")
      .inTable("Meeting")
      .onDelete("CASCADE");
    table
      .foreign("student_id")
      .references("user_id")
      .inTable("Student")
      .onDelete("CASCADE");
    table.primary(["meeting_id", "student_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("meeting_student");
};
