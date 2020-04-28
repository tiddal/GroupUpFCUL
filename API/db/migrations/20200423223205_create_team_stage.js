exports.up = function (knex) {
  return knex.schema.createTable("team_stage", function (table) {
    table.uuid("stage_id");
    table.uuid("team_id");
    table.decimal("stage_grade");
    table.string("stage_feedback");
    table.string("submission_url").notNullable();
    table.timestamp("submitted_at").notNullable();
    table.timestamps(true, true);
    table
      .foreign("stage_id")
      .references("id")
      .inTable("Stage")
      .onDelete("CASCADE");
    table
      .foreign("team_id")
      .references("id")
      .inTable("Team")
      .onDelete("CASCADE");

    table.primary(["stage_id", "team_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("team_stage");
};
