const connection = require("../db/config/connection");
const errors = require("../utils/errors");

class ProfessorController {
  constructor() {
    this.find = this.find.bind(this);
    this.modify = this.modify.bind(this);
    this.findUnits = this.findUnits.bind(this);
  }

  async index(request, response) {
    const professors = await connection("Professor")
      .join("User", "User.id", "=", "Professor.user_id")
      .select([
        "User.username",
        "User.first_name",
        "User.last_name",
        "User.email",
        "Professor.room",
        "Professor.department",
      ]);
    return response.json(professors);
  }

  async find(request, response, next) {
    const user = await this.findUser(request, response, next);
    if (!user) return next();
    const [professor] = await connection("Professor")
      .join("User", "User.id", "=", "Professor.user_id")
      .select([
        "User.username",
        "User.first_name",
        "User.last_name",
        "User.email",
        "Professor.room",
        "Professor.department",
      ])
      .where("Professor.user_id", user.id);
    if (!professor)
      return next(errors.PROFESSOR_NOT_FOUND(user.username, "params"));
    return response.json(professor);
  }

  async modify(request, response, next) {
    const user = await this.findUser(request, response, next);
    if (!user) return next();
    const [professor] = await connection("Professor")
      .select("user_id")
      .where({ user_id: user.id });
    if (!professor)
      return next(errors.PROFESSOR_NOT_FOUND(user.username, "params"));
    const { room, department } = request.body.professor;
    const [updatedProfessor] = await connection("Professor")
      .where(professor)
      .update(
        {
          room,
          department,
        },
        ["room", "department"]
      );

    return response.json(updatedProfessor);
  }

  async findUser(request, response, next) {
    const { username } = request.params;
    const [user] = await connection("User")
      .select(["id", "username"])
      .where({ username });
    if (!user) return next(errors.USER_NOT_FOUND(username, "params"));
    return user;
  }

  async findUnits(request, response, next) {
    const user = await this.findUser(request, response, next);
    const [professor] = await connection("Professor")
      .select("user_id")
      .where({ user_id: user.id });
    if (!professor)
      return next(errors.PROFESSOR_NOT_FOUND(user.username, "params"));
    const [class_] = await connection("class_professor")
      .select("class_id")
      .where({ professor_id: professor.user_id });
    const [unit] = await connection("Class")
      .select("unit_id")
      .where({ id: class_.class_id });
    console.log(unit);
    return unit;
  }
}
module.exports = new ProfessorController();
