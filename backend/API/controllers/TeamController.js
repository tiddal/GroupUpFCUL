const connection = require("../db/config/connection");
const errors = require("../utils/errors");
const { v4: uuidv4 } = require("uuid");

class TeamController {
  constructor() {
    this.index = this.index.bind(this);
    this.store = this.store.bind(this);
    this.find = this.find.bind(this);
    this.modify = this.modify.bind(this);
    this.remove = this.remove.bind(this);
    this.findMembers = this.findMembers.bind(this);
    this.findMember = this.findMember.bind(this);
    this.storeMember = this.storeMember.bind(this);
    this.updateMember = this.updateMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.findMembersRates = this.findMembersRates.bind(this);
    this.modifyMemberRate = this.modifyMemberRate.bind(this);
    this.storeMemberRate = this.storeMemberRate.bind(this);

    this.findTeamOwner = this.findTeamOwner.bind(this);
    this.findTeam = this.findTeam.bind(this);
    this.findProject = this.findProject.bind(this);
  }

  async index(request, response, next) {
    const project = await this.findProject(request, response, next);
    if (!project) return next();
    const teams = await connection("Team")
      .select(["team_number", "name", "description", "academic_year"])
      .where({ project_id: project.id });
    return response.json(teams);
  }

  async find(request, response, next) {
    const project = await this.findProject(request, response, next);
    if (!project) return next();
    const { team_number } = request.params;
    const [team] = await connection("Team")
      .select(["team_number", "name", "description", "academic_year"])
      .where({ team_number, project_id: project.id });
    if (!team) return next(errors.TEAM_NOT_FOUND(team_number, "params"));
    return response.json(team);
  }

  async store(request, response, next) {
    const { id: user_id, role } = request.user;
    if (role !== "student") return next(errors.INVALID_IDENTITY());
    const project = await this.findProject(request, response, next);
    if (!project) return next();
    const [userInTeam] = await connection("team_student")
      .join("Team", "Team.id", "team_student.team_id")
      .select("team_number")
      .where({ project_id: project.id, student_id: user_id });
    if (userInTeam) return next(errors.ALREADY_IN_TEAM(userInTeam.team_number));

    const [class_] = await connection("Class")
      .join("class_student", "class_student.class_id", "=", "Class.id")
      .select("Class.id")
      .where({
        student_id: user_id,
        unit_id: project.unit_id,
        academic_year: project.academic_year,
      });
    if (!class_) return next(errors.INVALID_IDENTITY());

    let team_number = "T001";
    let name = "Grupo 1";
    const id = uuidv4();
    const { id: project_id, academic_year } = project;
    const [existentTeam] = await connection("Team")
      .select("team_number")
      .where({ project_id })
      .orderBy("team_number", "desc")
      .limit(1);
    if (existentTeam) {
      team_number =
        "T" +
        ("00" + `${parseInt(existentTeam.team_number.slice(1)) + 1}`).slice(-3);
      name = `Grupo ${parseInt(existentTeam.team_number.slice(1)) + 1}`;
    }

    try {
      const [team] = await connection("Team").insert(
        {
          id,
          project_id,
          team_number,
          name,
          academic_year,
        },
        ["team_number", "name", "academic_year"]
      );
      await connection("team_student").insert({
        team_id: id,
        student_id: user_id,
        role: "owner",
      });
      return response.status(201).json(team);
    } catch (error) {
      return next(errors.UNIQUE_CONSTRAIN(error.detail));
    }
  }

  async modify(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const { name, description, logo_url } = request.body.team;
    const [updatedTeam] = await connection("Team")
      .where(team)
      .update({ name, description, logo_url }, [
        "team_number",
        "name",
        "description",
        "logo_url",
        "academic_year",
      ]);
    return response.json(updatedTeam);
  }

  async remove(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    await connection("Team").where(team).del();
    return response.status(204).send();
  }

  async findMembers(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const members = await connection("team_student")
      .leftJoin("User", "User.id", "=", "team_student.student_id")
      .leftJoin(
        "team_ratings",
        "team_ratings.member_rated_id",
        "=",
        "team_student.student_id"
      )
      .select([
        "User.username",
        "User.first_name",
        "User.last_name",
        "User.email",
        "User.avatar_url",
        "team_student.role",
        connection.raw(
          "COUNT(rate) OVER (PARTITION BY team_student) AS number_of_ratings"
        ),
        connection.raw(
          "ROUND(AVG(rate) OVER (PARTITION BY team_student), 2) AS rating"
        ),
      ])
      .where("team_student.team_id", team.id)
      .distinct("User.username");
    return response.json(members);
  }

  async findMember(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const { username } = request.params;
    const [member] = await connection("team_student")
      .join("User", "User.id", "=", "team_student.student_id")
      .select([
        "User.username",
        "User.first_name",
        "User.last_name",
        "User.email",
        "team_student.role",
      ])
      .where("User.username", username);
    if (!member) return next(errors.USER_NOT_FOUND(username, "params"));
    return response.json(member);
  }

  async storeMember(request, response, next) {
    const project = await this.findProject(request, response, next);
    const { username } = request.user;
    const [user] = await connection("Student")
      .join("User", "User.id", "=", "Student.user_id")
      .select("*")
      .where("User.username", username);
    if (!user) return next(errors.STUDENT_NOT_FOUND(username, "params"));

    const [class_] = await connection("Class")
      .join("class_student", "class_student.class_id", "=", "Class.id")
      .select("Class.id")
      .where({
        student_id: user.id,
        unit_id: project.unit_id,
        academic_year: project.academic_year,
      });
    if (!class_) return next(errors.STUDENT_NOT_IN_UNIT(username));

    const team = await this.findTeam(request, response, next);
    if (!team) return next();

    const members = await connection("team_student")
      .select("*")
      .where({ team_id: team.id });

    if (members.length === project.max_students)
      return next(errors.MAX_MEMBERS_REACHED(project.max_students));

    try {
      await connection("team_student").insert({
        student_id: user.id,
        team_id: team.id,
        role: "pending",
      });
      return response.status(201).json(username);
    } catch (error) {
      return next(errors.UNIQUE_CONSTRAIN(error.detail));
    }
  }

  async updateMember(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const { id: student_id, username: self } = request.user;
    const { username } = request.params;
    if (self === username) {
      const [member] = await connection("team_student")
        .select("*")
        .where({ team_id: team.id, student_id, role: "pending" });
      if (!member) return next(errors.USER_NOT_FOUND(username, "params"));
      const [updatedMember] = await connection("team_student")
        .where(member)
        .update({ role: "member" }, ["role"]);
      return response.json(updatedMember);
    } else {
      const owner = await this.findTeamOwner(request, response, next);
      if (!owner) return next(errors.INVALID_IDENTITY());
      const [userToUpdate] = await connection("Student")
        .join("User", "User.id", "Student.user_id")
        .select("User.id")
        .where("User.username", username);
      if (!userToUpdate) return next(errors.USER_NOT_FOUND(username, "params"));

      const [member] = await connection("team_student")
        .select("*")
        .where({ team_id: owner.team_id, student_id: userToUpdate.id });
      if (!member) return next(errors.USER_NOT_FOUND(username, "params"));

      const { role } = request.body;
      if (!role) return next(errors.INVALID_BODY(["role"]));
      const [updatedMember] = await connection("team_student")
        .where(member)
        .update({ role }, ["role"]);
      return response.json(updatedMember);
    }
  }

  async removeMember(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const { id: student_id, username: self } = request.user;
    const { username } = request.params;
    const [user] = await connection("team_student")
      .select("*")
      .where({ team_id: team.id, student_id });
    if (!user) return next(errors.USER_NOT_FOUND());

    if (self === username) {
      const members = await connection("team_student")
        .select("*")
        .where({ team_id: team.id });
      if (user.role === "owner" && members.length > 1)
        return next(errors.TEAM_NOT_EMPTY());
      await connection("team_student").where(user).del();
      if (user.role !== "owner") {
        return response.status(204).send();
      } else {
        await connection("Team").where({ id: team.id }).del();
        return response.status(204).send();
      }
    } else {
      if (user.role !== "owner") return next(errors.INVALID_IDENTITY());
      const [userToRemove] = await connection("Student")
        .join("User", "User.id", "Student.user_id")
        .select("User.id")
        .where("User.username", username);
      if (!userToRemove) return next(errors.USER_NOT_FOUND(username, "params"));
      const [member] = await connection("team_student")
        .select("*")
        .where({ team_id: team.id, student_id: userToRemove.id });
      if (!member) return next(errors.USER_NOT_FOUND(username, "params"));
      await connection("team_student").where(member).del();
      return response.status(204).send();
    }
  }

  async findMembersRates(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const { id: member_id } = request.user;
    const members = await connection("team_ratings")
      .join("User", "User.id", "=", "team_ratings.member_rated_id")
      .select([
        "User.username",
        "User.first_name",
        "User.last_name",
        "team_ratings.rate",
      ])
      .where("team_ratings.member_id", member_id)
      .where("team_ratings.team_id", team.id);
    return response.json(members);
  }

  async storeMemberRate(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const { id: member_id } = request.user;
    const { username, rate } = request.body.rate;
    const [studentToRate] = await connection("Student")
      .join("User", "User.id", "=", "Student.user_id")
      .select("User.id")
      .where({ username });
    if (!studentToRate) return next(errors.STUDENT_NOT_FOUND(username, "body"));

    const [memberRate] = await connection("team_ratings").insert(
      {
        team_id: team.id,
        member_id,
        member_rated_id: studentToRate.id,
        rate,
      },
      ["rate"]
    );
    return response.status(201).json(memberRate);
  }

  async modifyMemberRate(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const { id: member_id } = request.user;
    const { username, rate } = request.body.rate;
    const [studentToRate] = await connection("Student")
      .join("User", "User.id", "=", "Student.user_id")
      .select("User.id")
      .where({ username });
    if (!studentToRate) return next(errors.STUDENT_NOT_FOUND(username, "body"));
    const updatedMember = await connection("team_ratings")
      .where({
        team_id: team.id,
        member_id,
        member_rated_id: studentToRate.id,
      })
      .update({ rate });
    return response.json(updatedMember);
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
      .select("id", "academic_year", "unit_id", "max_students", "min_students")
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

  async findTeamOwner(request, response, next) {
    const team = await this.findTeam(request, response, next);
    if (!team) return next();
    const { id: student_id, role } = request.user;
    if (role !== "student") return next(errors.INVALID_IDENTITY());
    const [owner] = await connection("team_student")
      .select("student_id", "team_id")
      .where({ student_id, team_id: team.id, role: "owner" });
    if (!owner) return next(errors.INVALID_IDENTITY());
    return owner;
  }
}

module.exports = new TeamController();
