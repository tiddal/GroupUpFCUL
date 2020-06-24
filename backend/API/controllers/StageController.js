const connection = require("../db/config/connection");
const errors = require("../utils/errors");
const { v4: uuidv4 } = require("uuid");
const aws = require("aws-sdk");

class StageController {
  constructor() {
    this.index = this.index.bind(this);
    this.store = this.store.bind(this);
    this.find = this.find.bind(this);
    this.modify = this.modify.bind(this);
    this.remove = this.remove.bind(this);
    this.storeTeam = this.storeTeam.bind(this);
    this.findTeams = this.findTeams.bind(this);
    this.findStage = this.findStage.bind(this);
    this.findTeam = this.findTeam.bind(this);
    this.modifyTeamStage = this.modifyTeamStage.bind(this);
    this.removeSubmissionFile = this.removeSubmissionFile.bind(this);
  }

  async index(request, response, next) {
    const project = await this.findProject(request, response, next);
    if (!project) return next();
    const stages = await connection("Stage")
      .select([
        "stage_number",
        "description",
        "start_date",
        "end_date",
        "weight",
        "assignment_url",
        "filename",
        "original_filename",
      ])
      .where({ project_id: project.id });

    return response.json(stages);
  }

  async store(request, response, next) {
    const project = await this.findProject(request, response, next);
    if (!project) return next();
    let stage_number = 1;
    const { description, start_date, end_date, weight } = request.body;
    const {
      originalname: original_filename,
      key: filename,
      location: assignment_url = "",
    } = request.file;
    const id = uuidv4();
    const { id: project_id } = project;
    const [existentStage] = await connection("Stage")
      .select("stage_number")
      .where({ project_id })
      .orderBy("stage_number", "desc")
      .limit(1);

    if (existentStage) stage_number = parseInt(existentStage.stage_number) + 1;
    try {
      const [stage] = await connection("Stage").insert(
        {
          id,
          project_id,
          stage_number,
          description,
          start_date,
          end_date,
          weight,
          assignment_url,
          filename,
          original_filename,
        },
        ["stage_number", "description", "start_date", "end_date", "weight"]
      );
      return response.status(201).json(stage);
    } catch (error) {
      return next(errors.UNIQUE_CONSTRAIN(error.detail));
    }
  }

  async find(request, response, next) {
    const project = await this.findProject(request, response, next);
    if (!project) return next();
    const { stage_number } = request.params;
    const [stage] = await connection("Stage")
      .select([
        "stage_number",
        "description",
        "start_date",
        "end_date",
        "weight",
        "assignment_url",
        "filename",
        "original_filename",
      ])
      .where({ stage_number, project_id: project.id });
    if (!stage) return next(errors.STAGE_NOT_FOUND(stage_number, "params"));
    return response.json(stage);
  }

  async modify(request, response, next) {
    const stage = await this.findStage(request, response, next);
    if (!stage) return next();
    const { description, end_date, weight } = request.body;
    let original_filename;
    let filename;
    let assignment_url;
    if (request.file) {
      assignment_url = request.file.location;
      filename = request.file.key;
      original_filename = request.file.originalname;
    }
    const [updatedStage] = await connection("Stage").where(stage).update(
      {
        description,
        end_date,
        weight,
        assignment_url,
        filename,
        original_filename,
      },
      [
        "stage_number",
        "description",
        "start_date",
        "end_date",
        "weight",
        "assignment_url",
        "filename",
        "original_filename",
      ]
    );
    return response.json(updatedStage);
  }

  async remove(request, response, next) {
    const stage = await this.findStage(request, response, next);
    if (!stage) return next();
    await connection("Stage").where(stage).del();
    const s3 = new aws.S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_FILES_BUCKET_NAME,
        Key: stage.filename,
      })
      .promise();
    return response.status(204).send();
  }

  async storeTeam(request, response, next) {
    const { id: user_id } = request.user;
    const stage = await this.findStage(request, response, next);
    if (!stage) return next();
    const submitted_at = new Date();
    const { team_number } = request.body;
    const [team] = await connection("Team")
      .select("id")
      .where({ team_number, project_id: stage.project_id });
    if (!team) return next(errors.TEAM_NOT_FOUND(team_number, "body"));
    const {
      originalname: original_filename,
      key: filename,
      location: submission_url = "",
    } = request.file;
    try {
      const [team_stage] = await connection("team_stage").insert(
        {
          stage_id: stage.id,
          team_id: team.id,
          submitted_at,
        },
        ["submitted_at"]
      );
      const id = uuidv4();
      const [submission_file] = await connection("SubmissionFile").insert(
        {
          id,
          stage_id: stage.id,
          team_id: team.id,
          submission_url,
          filename,
          user_id,
          original_filename,
        },
        ["submission_url", "original_filename", "id"]
      );
      submission_file.uploaded_by = request.user.username;
      team_stage.submission_file = submission_file;
      return response.status(201).json(team_stage);
    } catch (error) {
      return next(errors.UNIQUE_CONSTRAIN(error.detail));
    }
  }

  async findTeams(request, response, next) {
    const stage = await this.findStage(request, response, next);
    if (!stage) return next();
    const teams = await connection("team_stage")
      .join("Team", "Team.id", "=", "team_stage.team_id")
      .select([
        "Team.team_number",
        "Team.name",
        "Team.description",
        "Team.logo_url",
        "team_stage.stage_grade",
        "team_stage.stage_feedback",
        "team_stage.submitted_at",
      ])
      .where("team_stage.stage_id", stage.id);

    return response.json(teams);
  }

  async findTeam(request, response, next) {
    const stage = await this.findStage(request, response, next);
    if (!stage) return next();
    const { team_number } = request.params;
    const [team] = await connection("Team")
      .select("id")
      .where({ team_number, project_id: stage.project_id });
    if (!team) return next(errors.TEAM_NOT_FOUND(team_number, "params"));
    const [team_stage] = await connection("team_stage")
      .join("Team", "Team.id", "=", "team_stage.team_id")
      .select([
        "Team.team_number",
        "Team.name",
        "Team.description",
        "Team.logo_url",
        "team_stage.stage_grade",
        "team_stage.stage_feedback",
        "team_stage.submitted_at",
      ])
      .where("team_stage.stage_id", stage.id)
      .where("team_stage.team_id", team.id);

    if (!team_stage) return response.json({});
    const artifacts = await connection("SubmissionFile")
      .leftJoin(
        "team_stage",
        "team_stage.team_id",
        "=",
        "SubmissionFile.team_id"
      )
      .leftJoin("User", "SubmissionFile.user_id", "=", "User.id")
      .select([
        "SubmissionFile.id",
        "SubmissionFile.submission_url",
        "SubmissionFile.original_filename AS filename",
        "User.username",
      ])
      .where("team_stage.stage_id", stage.id)
      .where("SubmissionFile.team_id", team.id);
    team_stage.artifacts = artifacts;
    return response.json(team_stage);
  }

  async modifyTeamStage(request, response, next) {
    const { id: user_id } = request.user;
    const stage = await this.findStage(request, response, next);
    if (!stage) return next();
    const { team_number } = request.params;
    const [team] = await connection("Team")
      .select("id")
      .where({ team_number, project_id: stage.project_id });
    if (!team) return next(errors.TEAM_NOT_FOUND(team_number, "params"));
    const { stage_grade, stage_feedback, submitted_at } = request.body;
    const {
      originalname: original_filename,
      key: filename,
      location: submission_url = "",
    } = request.file;
    const [updatedStage] = await connection("team_stage")
      .where({ team_id: team.id, stage_id: stage.id })
      .update({ stage_grade, stage_feedback, submitted_at }, [
        "stage_grade",
        "stage_feedback",
        "submitted_at",
      ]);
    if (submission_url) {
      const id = uuidv4();
      try {
        const [submission_file] = await connection("SubmissionFile").insert(
          {
            id,
            stage_id: stage.id,
            team_id: team.id,
            submission_url,
            filename,
            user_id,
            original_filename,
          },
          ["submission_url", "original_filename", "id"]
        );
        submission_file.uploaded_by = request.user.username;
        updatedStage.submission_file = submission_file;
      } catch (error) {
        return next(errors.UNIQUE_CONSTRAIN(error.detail));
      }
    }

    return response.json(updatedStage);
  }

  async removeSubmissionFile(request, response, next) {
    const stage = await this.findStage(request, response, next);
    if (!stage) return next();
    const { team_number } = request.params;
    const [team] = await connection("Team")
      .select("id")
      .where({ team_number, project_id: stage.project_id });
    if (!team) return next(errors.TEAM_NOT_FOUND(team_number, "params"));
    const { submission_id } = request.params;
    const { id: user_id } = request.user;
    const [submission_file] = await connection("SubmissionFile")
      .select("id", "filename")
      .where({ id: submission_id, user_id });
    if (!submission_file) return next(errors.INVALID_IDENTITY());
    await connection("SubmissionFile").where(submission_file).del();
    const s3 = new aws.S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_FILES_BUCKET_NAME,
        Key: submission_file.filename,
      })
      .promise();
    return response.status(204).send();
  }

  // GET /courses/L079/units/26719/projects/2019-2020/1/stages
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
      .select("id")
      .where({ academic_year, number, unit_id: unit.id });
    if (!project)
      return next(errors.PROJECT_NOT_FOUND(academic_year, number, "params"));
    return project;
  }

  async findStage(request, response, next) {
    const project = await this.findProject(request, response, next);
    if (!project) return next();
    const { stage_number } = request.params;
    const [stage] = await connection("Stage")
      .select("id", "project_id", "assignment_url", "filename")
      .where({ stage_number, project_id: project.id });
    if (!stage) return next(errors.STAGE_NOT_FOUND(stage_number, "params"));
    return stage;
  }
}

module.exports = new StageController();
