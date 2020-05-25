const express = require("express");
const nuclass = express.Router({ mergeParams: true });

const { adminRequired } = require("../middleware/permissions");

const ClassController = require("../controllers/ClassController");
const ClassValidator = require("../validators/ClassValidator");

nuclass.get("/:year", adminRequired, ClassController.findNUClassByYear);

module.exports = nuclass;
