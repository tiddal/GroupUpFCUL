const express = require("express");
const meetings = express.Router({ mergeParams: true });

const { loginRequired } = require("../middleware/permissions");

const MeetingController = require("../controllers/MeetingController");

const MeetingValidator = require("../validators/MeetingValidator");

meetings.get("/", loginRequired, MeetingController.index);
meetings.get(
  "/:meeting_number",
  loginRequired,
  MeetingValidator.find,
  MeetingController.find
);
meetings.get(
  "/:meeting_number/members",
  loginRequired,
  MeetingValidator.find,
  MeetingController.findStudents
);
meetings.post(
  "/",
  loginRequired,
  MeetingValidator.create,
  MeetingController.store
);
meetings.post(
  "/:meeting_number/members",
  loginRequired,
  MeetingValidator.createStudents,
  MeetingController.storeStudents
);
meetings.put(
  "/:meeting_number",
  loginRequired,
  MeetingValidator.find,
  MeetingValidator.edit,
  MeetingController.modify
);
meetings.delete(
  "/:meeting_number",
  loginRequired,
  MeetingValidator.find,
  MeetingController.remove
);
meetings.delete(
  "/:meeting_number/members/:username",
  loginRequired,
  MeetingValidator.find,
  MeetingValidator.removeStudents,
  MeetingController.removeStudents
);

module.exports = meetings;
