const connection = require("../db/config/connection");
const { v4: uuidv4 } = require("uuid");
const errors = require("../utils/errors");

class CourseController {
  constructor() {
    this.index = this.index.bind(this);
    this.find = this.find.bind(this);
    this.store = this.store.bind(this);
    this.modify = this.modify.bind(this);
    this.remove = this.remove.bind(this);
    this.findCourse = this.findCourse.bind(this);
  }

  async index(request, response) {
    const courses = await connection("Course").select([
      "code",
      "name",
      "cycle",
      "initials",
    ]);
    return response.json(courses);
  }

  async find(request, response, next) {
    const { code } = request.params;
    const [course] = await connection("Course")
      .select(["code", "name", "cycle", "initials"])
      .where({ code });
    if (!course) return next(errors.COURSE_NOT_FOUND(code, "params"));
    return response.json(course);
  }

  async store(request, response) {
    const createdCourses = [];

    for (let [index, course] of request.body.courses.entries()) {
      const { code, name, cycle, initials, units } = course;
      const course_id = uuidv4();
      try {
        const [createdCourse] = await connection("Course").insert(
          {
            id: course_id,
            code,
            name,
            cycle,
            initials,
          },
          ["code", "name"]
        );
        createdCourses.push({ ...createdCourse, units: [] });
        for (let unit of units) {
          const { code, name, semester, initials, ects } = unit;
          let [courseUnit] = await connection("Unit")
            .select("id")
            .where({ code });
          if (!courseUnit) {
            const id = uuidv4();
            [courseUnit] = await connection("Unit").insert(
              {
                id,
                code,
                name,
                semester,
                initials,
                ects,
              },
              ["id", "code", "name"]
            );
          }
          await connection("course_unit").insert({
            course_id: course_id,
            unit_id: courseUnit.id,
          });
          courseUnit.id = undefined;
          createdCourses[index].units.push(courseUnit);
        }
      } catch (error) {
        return response.status(409).json({
          error: errors.UNIQUE_CONSTRAIN(error.detail),
          created: createdCourses,
        });
      }
    }

    return response.status(201).json(createdCourses);
  }

  async modify(request, response, next) {
    const course = await this.findCourse(request, response, next);
    if (!course) return next();
    const { name, initials } = request.body.course;
    const [updatedCourse] = await connection("Course").where(course).update(
      {
        name,
        initials,
      },
      ["code", "name", "cycle", "initials"]
    );
    return response.json(updatedCourse);
  }

  async remove(request, response, next) {
    const course = await this.findCourse(request, response, next);
    if (!course) return next();
    await connection("Course").where(course).del();
    return response.status(204).send();
  }

  async findCourse(request, response, next) {
    const { code } = request.params;
    const [course] = await connection("Course").select("id").where({ code });
    if (!course) return next(errors.COURSE_NOT_FOUND(code, "params"));
    return course;
  }
}

module.exports = new CourseController();
