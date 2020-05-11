exports.up = function (knex) {
  return knex.schema.createTable("Task", function (table) {
    table.uuid("id").primary();
    table.uuid("student_id").notNullable();
    table.uuid("team_id").notNullable();
    table.string("task_number").notNullable().unique();
    table.string("title").notNullable();
    table.string("description");
    table.string("start_date").notNullable();
    table.string("end_date").notNullable();
    table.timestamps(true, true);
    table
      .foreign("student_id")
      .references("user_id")
      .inTable("Student")
      .onDelete("CASCADE");
    table
      .foreign("team_id")
      .references("id")
      .inTable("Team")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Task");
};
