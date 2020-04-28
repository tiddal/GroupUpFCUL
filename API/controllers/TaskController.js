const connection = require("../db/config/connection");
const errors = require("../utils/errors");
const { v4: uuidv4 } = require("uuid");

class TaskController {
  constructor() {
    this.index = this.index.bind(this);
    this.store = this.store.bind(this);
    this.find = this.find.bind(this);
    this.modify = this.modify.bind(this);
    this.remove = this.remove.bind(this);

    this.findTask = this.findTask.bind(this);
    this.findTeam = this.findTeam.bind(this);
    this.findProject = this.findProject.bind(this);
    this.findStudentByUsername = this.findStudentByUsername.bind(this);
  }

  async index(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const tasks = await connection("Task")
      .select(["task_number", "title", "description", "start_date", "end_date"])
      .where({ team_id: team.id });
    return response.json(tasks);
  }

  async find(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const { task_number } = request.params;
    const [task] = await connection("Task")
      .select(["task_number", "title", "description", "start_date", "end_date"])
      .where({ task_number, team_id: team.id });
    if (!task) return next(errors.TASK_NOT_FOUND(task_number, "params"));
    return response.json(task_number);
  }

  async store(request, response, next) {
    const { id: user_id, role } = request.user;
    if (role !== "student") return next(errors.INVALID_IDENTITY());
    const team = await this.findTeam(request, response, next);
    if (!team) return next();

    const [belongsToTeam] = await connection("team_student")
      .select("student_id")
      .where({
        student_id: user_id,
        team_id: team.id,
      });
    if (!belongsToTeam) return next(errors.INVALID_IDENTITY());

    let task_number = 1;
    const { title, description, start_date, end_date } = request.body.task;
    const id = uuidv4();
    const { id: team_id } = team;
    const [existentTask] = await connection("Task")
      .select("task_number")
      .where({ team_id })
      .orderBy("task_number", "desc")
      .limit(1);
    if (existentTask) task_number = existentTask + 1;
    try {
      const [task] = await connection("Task").insert(
        {
          id,
          student_id,
          team_id,
          task_number,
          title,
          description,
          start_date,
          end_date,
        },
        ["task_number", "title", "description", "start_date", "end_date"]
      );
      return response.status(201).json(task);
    } catch (error) {
      return next(errors.UNIQUE_CONSTRAIN(error.detail));
    }
  }

  async modify(request, response, next) {
    const task = await this.findTask(request, response, next);
    if (!task) return next();
    const { title, description, start_date, end_date } = request.body.team;
    const [updatedTask] = await connection("Task")
      .where(task)
      .update({ task_number, title, description, start_date, end_date }, [
        "title",
        "description",
        "start_date",
        "end_date",
      ]);
    return response.json(updatedTask);
  }

  async remove(request, response, next) {
    const task = await this.findTask(request, response, next);
    if (!task) return next();
    await connection("Task").where(task).del();
    return response.status(204).send();
  }

  async findProject(request, response, next) {
    const { code } = request.params;
    const [course] = await connection("Course").select("id").where({ code });
    if (!course) return next(errors.COURSE_NOT_FOUND(code, "params"));
    const { unit_code } = request.params;
    const [unit] = await connection("course_unit")
      .join("Unit", "Unit.id", "=", "course_unit.unit_id")
      .select("Unit.id")
      .where({
        "course_unit.course_id": course.id,
        "Unit.code": unit_code,
      });
    if (!unit) return next(errors.UNIT_NOT_FOUND(unit_code, "params"));
    const {
      project_year: academic_year,
      project_number: number,
    } = request.params;
    const [project] = await connection("Project")
      .select("id", "academic_year", "unit_id")
      .where({ academic_year, number, unit_id: unit.id });
    if (!project)
      return next(errors.PROJECT_NOT_FOUND(academic_year, number, "params"));
    return project;
  }

  async findTeam(request, response, next) {
    const project = await this.findProject(request, response, next);
    if (!project) return next();
    const { team_number } = request.params;
    const [team] = await connection("Team")
      .select("id")
      .where({ team_number, project_id: project.id });
    if (!team) return next(errors.TEAM_NOT_FOUND(team_number, "params"));
    return team;
  }

  async findTask(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const { task_number } = request.params;
    const [task] = await connection("Task")
      .select("id")
      .where({ task_number, team_id: team.id });
    if (!task) return next(errors.TASK_NOT_FOUND(task_number, "params"));
    return task;
  }

  async findStudentByUsername(request, response, next) {
    const { student_username } = request.params;
    const [student] = await connection("Student")
      .join("User", "User.id", "=", "Student.user_id")
      .select(["User.id", "User.username"])
      .where("User.username", student_username);
    if (!student)
      return next(errors.STUDENT_NOT_FOUND(student_username, "params"));
    return student;
  }
}

module.exports = new TaskController();
