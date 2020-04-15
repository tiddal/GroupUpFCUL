const request = require("supertest");
const app = require("../../app/index");
const connection = require("../../db/config/connection");

describe("Team", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new Team", async () => {
    const createUnit = await request(app)
      .post("/courses")
      .send({
        courses: [
          {
            code: "L111",
            name: "Course One",
            cycle: 1,
            initials: "C1",
            units: [
              {
                code: 11111,
                name: "Unit One",
                semester: 1,
                initials: "U1",
                ects: 6,
              },
            ],
          },
        ],
      });
    const createProject = await request(app)
      .post("/courses/L111/units/1111/projects")
      .send({
        project: {
          name: "Nada",
          academic_year: "2019-2020",
          min_students: 0,
          max_students: 2,
          description: "Nothing",
          objectives: "None",
          assignment_url: "assignment.pdf",
          stages: [
            {
              description: "Fazer absolutamente nada",
              start_date: "01-03-2019",
              end_date: "02-04-2019",
              weight: 1,
            },
          ],
        },
      });
    const response = await request(app)
      .post("/courses/L111/units/1111/projects/2019-2020/1/teams")
      .send({
        team: {
          name: "20 é derrota",
          description: "Queremos 19,9",
          avatar_url: "19virgula9.png",
        },
      });
    expect(response.status).toBe(201);
  });

  it("should be able to get all Team's information", async () => {
    const createUnit = await request(app)
      .post("/courses")
      .send({
        courses: [
          {
            code: "L111",
            name: "Course One",
            cycle: 1,
            initials: "C1",
            units: [
              {
                code: 11111,
                name: "Unit One",
                semester: 1,
                initials: "U1",
                ects: 6,
              },
            ],
          },
        ],
      });
    const createProject = await request(app)
      .post("/courses/L111/units/1111/projects")
      .send({
        project: {
          name: "Nada",
          academic_year: "2019-2020",
          min_students: 0,
          max_students: 2,
          description: "Nothing",
          objectives: "None",
          assignment_url: "assignment.pdf",
          stages: [
            {
              description: "Fazer absolutamente nada",
              start_date: "01-03-2019",
              end_date: "02-04-2019",
              weight: 1,
            },
          ],
        },
      });
    const createTeams = await request(app)
      .post("/courses/L111/units/1111/projects/2019-2020/1/teams")
      .send({
        team: {
          name: "20 é derrota",
          description: "Queremos 19,9",
          avatar_url: "19virgula9.png",
        },
      });
    const response = await request(app).get(
      "/courses/L111/units/1111/projects/2019-2020/1/teams"
    );
    expect(response.status).toBe(200);
  });

  it("should be able to get a Team's information by their code", async () => {
    const createUnit = await request(app)
      .post("/courses")
      .send({
        courses: [
          {
            code: "L111",
            name: "Course One",
            cycle: 1,
            initials: "C1",
            units: [
              {
                code: 11111,
                name: "Unit One",
                semester: 1,
                initials: "U1",
                ects: 6,
              },
            ],
          },
        ],
      });
    const createProject = await request(app)
      .post("/courses/L111/units/1111/projects")
      .send({
        project: {
          name: "Nada",
          academic_year: "2019-2020",
          min_students: 0,
          max_students: 2,
          description: "Nothing",
          objectives: "None",
          assignment_url: "assignment.pdf",
          stages: [
            {
              description: "Fazer absolutamente nada",
              start_date: "01-03-2019",
              end_date: "02-04-2019",
              weight: 1,
            },
          ],
        },
      });
    const createTeams = await request(app)
      .post("/courses/L111/units/1111/projects/2019-2020/1/teams")
      .send({
        team: {
          name: "20 é derrota",
          description: "Queremos 19,9",
          avatar_url: "19virgula9.png",
        },
      });
    const response = await request(app).get(
      "/courses/L111/units/1111/projects/2019-2020/1/teams/G01"
    );
    expect(response.status).toBe(200);
  });

  it("should be able to update a Team's information", async () => {
    const createUnit = await request(app)
      .post("/courses")
      .send({
        courses: [
          {
            code: "L111",
            name: "Course One",
            cycle: 1,
            initials: "C1",
            units: [
              {
                code: 11111,
                name: "Unit One",
                semester: 1,
                initials: "U1",
                ects: 6,
              },
            ],
          },
        ],
      });
    const createProject = await request(app)
      .post("/courses/L111/units/1111/projects")
      .send({
        project: {
          name: "Nada",
          academic_year: "2019-2020",
          min_students: 0,
          max_students: 2,
          description: "Nothing",
          objectives: "None",
          assignment_url: "assignment.pdf",
          stages: [
            {
              description: "Fazer absolutamente nada",
              start_date: "01-03-2019",
              end_date: "02-04-2019",
              weight: 1,
            },
          ],
        },
      });
    const createTeams = await request(app)
      .post("/courses/L111/units/1111/projects/2019-2020/1/teams")
      .send({
        team: {
          name: "20 é derrota",
          description: "Queremos 19,9",
          avatar_url: "19virgula9.png",
        },
      });
    const response = await request(app)
      .put("/courses/L111/units/1111/projects/2019-2020/1/teams/G01")
      .send({
        team: {
          name: "20 é vitoria",
          description: "Afinal queremos 20",
          avatar_url: "20virgula0.png",
        },
      });
    expect(response.status).toBe(200);
  });

  it("should be able to delete a Team", async () => {
    const createUnit = await request(app)
      .post("/courses")
      .send({
        courses: [
          {
            code: "L111",
            name: "Course One",
            cycle: 1,
            initials: "C1",
            units: [
              {
                code: 11111,
                name: "Unit One",
                semester: 1,
                initials: "U1",
                ects: 6,
              },
            ],
          },
        ],
      });
    const createProject = await request(app)
      .post("/courses/L111/units/1111/projects")
      .send({
        project: {
          name: "Nada",
          academic_year: "2019-2020",
          min_students: 0,
          max_students: 2,
          description: "Nothing",
          objectives: "None",
          assignment_url: "assignment.pdf",
          stages: [
            {
              description: "Fazer absolutamente nada",
              start_date: "01-03-2019",
              end_date: "02-04-2019",
              weight: 1,
            },
          ],
        },
      });
    const createTeams = await request(app)
      .post("/courses/L111/units/1111/projects/2019-2020/1/teams")
      .send({
        team: {
          name: "20 é derrota",
          description: "Queremos 19,9",
          avatar_url: "19virgula9.png",
        },
      });
    const response = await request(app).delete(
      "/courses/L111/units/1111/projects/2019-2020/1/teams/G01"
    );
    expect(response.status).toBe(204);
  });

  it("should be able to add a Team to a Stage"),
    async () => {
      const createUnit = await request(app)
        .post("/courses")
        .send({
          courses: [
            {
              code: "L111",
              name: "Course One",
              cycle: 1,
              initials: "C1",
              units: [
                {
                  code: 11111,
                  name: "Unit One",
                  semester: 1,
                  initials: "U1",
                  ects: 6,
                },
              ],
            },
          ],
        });

      const createProject = await request(app)
        .post("/courses/L111/units/1111/projects")
        .send({
          project: {
            name: "Nada",
            academic_year: "2019-2020",
            min_students: 0,
            max_students: 2,
            description: "Nothing",
            objectives: "None",
            assignment_url: "assignment.pdf",
            stages: [
              {
                description: "Fazer absolutamente nada",
                start_date: "01-03-2019",
                end_date: "02-04-2019",
                weight: 1,
              },
            ],
          },
        });
      const createTeams = await request(app)
        .post("/courses/L111/units/1111/projects/2019-2020/1/teams/")
        .send({
          team: {
            name: "20 é derrota",
            description: "Queremos 19,9",
            avatar_url: "19virgula9.png",
          },
        });
      const response = await request(app)
        .post(
          "/courses/L111/units/1111/projects/2019-2020/1/teams/G01/stages/1"
        )
        .send({
          stage_grade: 16,
          stage_feedback: "atrasado 5 anos",
          submission_url: "queremosum16.pdf",
          submitted_at: "02-04-2024",
        });
      expect(response.status).toBe(201);
    };

  it("should be able to add a Student to a Team"),
    async () => {
      const createStudent = await request(app)
        .post("/users")
        .send({
          users: [
            {
              username: "fc60000",
              first_name: "Casimer",
              last_name: "Goodwin",
              email: "fc60000@alunos.fc.ul.pt",
              password: "K0Zv4yQYnoKVvLj",
              role: {
                type: "student",
                data: {},
              },
            },
          ],
        });
      const createUnit = await request(app)
        .post("/courses")
        .send({
          courses: [
            {
              code: "L111",
              name: "Course One",
              cycle: 1,
              initials: "C1",
              units: [
                {
                  code: 11111,
                  name: "Unit One",
                  semester: 1,
                  initials: "U1",
                  ects: 6,
                },
              ],
            },
          ],
        });

      const createProject = await request(app)
        .post("/courses/L111/units/1111/projects")
        .send({
          project: {
            name: "Nada",
            academic_year: "2019-2020",
            min_students: 0,
            max_students: 2,
            description: "Nothing",
            objectives: "None",
            assignment_url: "assignment.pdf",
            stages: [
              {
                description: "Fazer absolutamente nada",
                start_date: "01-03-2019",
                end_date: "02-04-2019",
                weight: 1,
              },
            ],
          },
        });
      const createTeams = await request(app)
        .post("/courses/L111/units/1111/projects/2019-2020/1/teams/")
        .send({
          team: {
            name: "20 é derrota",
            description: "Queremos 19,9",
            avatar_url: "19virgula9.png",
          },
        });
      const response = await request(app)
        .post("/courses/L111/units/1111/projects/2019-2020/1/teams/G01/")
        .send({
          students: [
            {
              username: "fc60000",
            },
          ],
        });
      expect(response.status).toBe(201);
    };
});
