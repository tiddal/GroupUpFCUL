const express = require("express");
const stages = express.Router({ mergeParams: true });
const StageController = require("../controllers/StageController");

// GET /courses/L079/units/26719/projects/2019-2020/1/stages

stages.get("/", StageController.index);
stages.post("/", StageController.store);
stages.get("/:stage_number", StageController.find);
stages.put("/:stage_number", StageController.modify);
stages.delete("/:stage_number", StageController.remove);
stages.post("/:stage_number/teams", StageController.storeTeam);
stages.get("/:stage_number/teams", StageController.findTeams);
stages.get("/:stage_number/teams/:team_number", StageController.findTeam);
stages.put(
  "/:stage_number/teams/:team_number",
  StageController.modifyTeamStage
);

module.exports = stages;
