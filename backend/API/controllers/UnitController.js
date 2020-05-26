const connection = require("../db/config/connection");
const { v4: uuidv4 } = require("uuid");
const errors = require("../utils/errors");

class UnitController {
  constructor() {
    this.index = this.index.bind(this);
    this.find = this.find.bind(this);
    this.store = this.store.bind(this);
    this.modify = this.modify.bind(this);
    this.remove = this.remove.bind(this);
    this.findUnit = this.findUnit.bind(this);
    this.findCourse = this.findCourse.bind(this);
    this.findNCUnits = this.findNCUnits.bind(this);
  }

  async index(request, response, next) {
    const course = await this.findCourse(request, response, next);
    if (!course) return next();
    const units = await connection("course_unit")
      .join("Unit", "Unit.id", "=", "course_unit.unit_id")
      .select([
        "Unit.code",
        "Unit.name",
        "Unit.semester",
        "Unit.initials",
        "Unit.ects",
      ])
      .where("course_unit.course_id", course.id);
    return response.json(units);
  }

  async find(request, response, next) {
    const course = await this.findCourse(request, response, next);
    if (!course) return next();
    const { unit_code } = request.params;
    const [unit] = await connection("course_unit")
      .join("Unit", "Unit.id", "=", "course_unit.unit_id")
      .select([
        "Unit.code",
        "Unit.name",
        "Unit.semester",
        "Unit.initials",
        "Unit.ects",
      ])
      .where({
        "course_unit.course_id": course.id,
        "Unit.code": unit_code,
      });
    if (!unit) return next(errors.UNIT_NOT_FOUND(unit_code, "params"));
    return response.json(unit);
  }

  async store(request, response, next) {
    const course = await this.findCourse(request, response, next);
    if (!course) return next();
    const createdUnits = [];
    for (let unit of request.body.units) {
      try {
        const { code, name, semester, initials, ects } = unit;
        const id = uuidv4();
        const [createdUnit] = await connection("Unit").insert(
          {
            id,
            code,
            name,
            semester,
            initials,
            ects,
          },
          ["code", "name"]
        );
        await connection("course_unit").insert({
          course_id: course.id,
          unit_id: id,
        });
        createdUnits.push(createdUnit);
      } catch (error) {
        return response.status(409).json({
          error: errors.UNIQUE_CONSTRAIN(error.detail),
          created: createdUnits,
        });
      }
    }
    return response.status(201).json(createdUnits);
  }

  async modify(request, response, next) {
    const unit = await this.findUnit(request, response, next);
    if (!unit) return next();
    const { name, semester, initials, ects } = request.body.unit;
    const [updatedUnit] = await connection("Unit")
      .where(unit)
      .update({ name, semester, initials, ects }, [
        "code",
        "name",
        "semester",
        "initials",
        "ects",
      ]);
    return response.json(updatedUnit);
  }

  async remove(request, response, next) {
    const unit = await this.findUnit(request, response, next);
    if (!unit) return next();
    await connection("Unit").where(unit).del();
    return response.status(204).send();
  }

  async findCourse(request, response, next) {
    const { code } = request.params;
    const [course] = await connection("Course").select("id").where({ code });
    if (!course) return next(errors.COURSE_NOT_FOUND(code, "params"));
    return course;
  }

  async findUnit(request, response, next) {
    const course = await this.findCourse(request, response, next);
    if (!course) return next();
    const { unit_code } = request.params;
    const [unit] = await connection("course_unit")
      .join("Unit", "Unit.id", "=", "course_unit.unit_id")
      .select("Unit.id")
      .where({
        "course_unit.course_id": course.id,
        "Unit.code": unit_code,
      });
    if (!unit) return next(errors.UNIT_NOT_FOUND(unit_code, "params"));
    return unit;
  }

  async findNCUnits(request, response, next) {
    const units = await connection("Unit").select(
      "code",
      "name",
      "semester",
      "initials",
      "ects"
    );
    return response.json(units);
  }
}

module.exports = new UnitController();
