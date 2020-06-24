const express = require("express");
const stages = express.Router({ mergeParams: true });
const StageController = require("../controllers/StageController");
const { loginRequired } = require("../middleware/permissions");
const multer = require("multer");
const multerFileConfig = require("../middleware/multerFiles");
// GET /courses/L079/units/26719/projects/2019-2020/1/stages

stages.get("/", loginRequired, StageController.index);
stages.post(
  "/",
  loginRequired,
  multer(multerFileConfig).single("file"),
  StageController.store
);
stages.get("/:stage_number", loginRequired, StageController.find);
stages.put(
  "/:stage_number",
  loginRequired,
  multer(multerFileConfig).single("file"),
  StageController.modify
);
stages.delete("/:stage_number", loginRequired, StageController.remove);
stages.post(
  "/:stage_number/teams",
  loginRequired,
  multer(multerFileConfig).single("file"),
  StageController.storeTeam
);
stages.get("/:stage_number/teams", loginRequired, StageController.findTeams);
stages.get(
  "/:stage_number/teams/:team_number",
  loginRequired,
  StageController.findTeam
);
stages.put(
  "/:stage_number/teams/:team_number",
  loginRequired,
  multer(multerFileConfig).single("file"),
  StageController.modifyTeamStage
);
stages.delete(
  "/:stage_number/teams/:team_number/:submission_id",
  loginRequired,
  StageController.removeSubmissionFile
);

module.exports = stages;
