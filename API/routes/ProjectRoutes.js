const express = require("express");
const projects = express.Router({ mergeParams: true });

const ProjectController = require("../controllers/ProjectController");

const ProjectValidator = require("../validators/ProjectValidator");

projects.get("/", ProjectController.index);
projects.get(
  "/:project_year",
  ProjectValidator.findYear,
  ProjectController.findByAcademicYear
);
projects.get(
  "/:project_year/:project_number",
  ProjectValidator.find,
  ProjectController.findById
);
projects.post("/", ProjectValidator.create, ProjectController.store);
projects.put(
  "/:project_year/:project_number",
  ProjectValidator.find,
  ProjectController.modify
);
projects.delete(
  "/:project_year/:project_number",
  ProjectValidator.find,
  ProjectController.remove
);

module.exports = projects;
