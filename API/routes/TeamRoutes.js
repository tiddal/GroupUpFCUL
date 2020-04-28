const express = require("express");
const teams = express.Router({ mergeParams: true });

const TeamController = require("../controllers/TeamController");
const TeamValidator = require("../validators/TeamValidator");
const MeetingRoutes = require("./MeetingRoutes");

const { loginRequired } = require("../middleware/permissions");

teams.use("/:team_number/meetings", MeetingRoutes);

// GET /courses/L079/units/26719/projects/2019-2020/1/teams
teams.get("/", loginRequired, TeamController.index);

// GET /courses/L079/units/26719/projects/2019-2020/1/teams/T001
teams.get(
  "/:team_number",
  loginRequired,
  TeamValidator.find,
  TeamController.find
);

// POST /courses/L079/units/26719/projects/2019-2020/1/teams
teams.post("/", loginRequired, TeamValidator.create, TeamController.store);

// PUT /courses/L079/units/26719/projects/2019-2020/1/teams/T001
teams.put(
  "/:team_number",
  loginRequired,
  TeamValidator.find,
  TeamValidator.edit,
  TeamController.modify
);

// DELETE /courses/L079/units/26719/projects/2019-2020/1/teams/0T01
teams.delete(
  "/:team_number",
  loginRequired,
  TeamValidator.find,
  TeamController.remove
);

module.exports = teams;
