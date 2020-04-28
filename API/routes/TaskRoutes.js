const express = require("express");
const tasks = express.Router({ mergeParams: true });

const TaskController = require("../controllers/TaskController");
const TaskValidator = require("../validators/TaskValidator");

const { loginRequired } = require("../middleware/permissions");

// GET /courses/L079/units/26719/projects/2019-2020/1/teams/T001/tasks
tasks.get("/", loginRequired, TaskController.index);

// GET /courses/L079/units/26719/projects/2019-2020/1/tasks/T001/tasks/1
tasks.get(
  "/:task_number",
  loginRequired,
  TaskValidator.find,
  TaskController.find
);

// POST /courses/L079/units/26719/projects/2019-2020/1/teams/T001/tasks
tasks.post("/", loginRequired, TaskValidator.create, TaskController.store);

// PUT /courses/L079/units/26719/projects/2019-2020/1/teams/T001/tasks/1
tasks.put(
  "/:task_number",
  loginRequired,
  TaskValidator.find,
  TaskValidator.edit,
  TaskController.modify
);

// DELETE /courses/L079/units/26719/projects/2019-2020/1/teams/T001/tasks/1
tasks.delete(
  "/:task_number",
  loginRequired,
  TaskValidator.find,
  TaskController.remove
);

module.exports = tasks;
