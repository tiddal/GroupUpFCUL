const express = require("express");
const ncunit = express.Router({ mergeParams: true });

const { adminRequired } = require("../middleware/permissions");

const UnitController = require("../controllers/UnitController");

ncunit.get("/", adminRequired, UnitController.findNCUnits);

module.exports = ncunit;
