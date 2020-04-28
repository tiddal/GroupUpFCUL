const request = require("supertest");
const app = require("../../API/app");
const connection = require("../../API/db/config/connection");
const { LTI, Project, Class, Team, Student, Task } = require("../factory");

describe("Task", () => {
  let adminToken;
  let professorToken;
  let studentToken;
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    await connection.seed.run();
    ({
      body: { token: adminToken },
    } = await request(app)
      .post("/authenticate")
      .send({
        user: {
          email: "fc00000@test.com",
          password: "password",
        },
      }));
    await request(app)
      .post("/courses")
      .send({
        courses: [LTI],
      })
      .set("Authorization", `Bearer ${adminToken}`);

    await request(app)
      .post("/courses/L079/units/26719/classes")
      .send({ classes: [Class] })
      .set("Authorization", `Bearer ${adminToken}`);

    await request(app)
      .post("/courses/L079/units/26719/classes/2019-2020/T1/students")
      .send({
        students: [
          {
            username: "fc00001",
          },
        ],
      })
      .set("Authorization", `Bearer ${adminToken}`);

    await request(app)
      .post("/users")
      .send({
        users: [Student],
      })
      .set("Authorization", `Bearer ${adminToken}`);

    ({
      body: { token: professorToken },
    } = await request(app)
      .post("/authenticate")
      .send({
        user: {
          email: "fc00002@test.com",
          password: "password",
        },
      }));
    await request(app)
      .post("/courses/L079/units/26719/projects")
      .send({ project: Project })
      .set("Authorization", `Bearer ${professorToken}`);

    ({
      body: { token: studentToken },
    } = await request(app)
      .post("/authenticate")
      .send({
        user: {
          email: "fc00001@test.com",
          password: "password",
        },
      }));
    await request(app)
      .post("/courses/L079/units/26719/projects/2019-2020/1/teams")
      .send({ team: Team })
      .set("Authorization", `Bearer ${studentToken}`);

    await request(app)
      .post("/courses/L079/units/26719/projects/2019-2020/1/teams/T001/tasks/")
      .send({ task: Task })
      .set("Authorization", `Bearer ${studentToken}`);
  });

  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });

  it("should be able to create a new task", async () => {
    const response = await request(app)
      .post("/courses/L079/units/26719/projects/2019-2020/1/teams/T001/tasks/")
      .send({ task: Task })
      .set("Authorization", `Bearer ${studentToken}`);
    expect(response.status).toBe(201);
  });

  it("should be able to get all tasks from a team", async () => {
    const response = await request(app)
      .get("/courses/L079/units/26719/projects/2019-2020/1/teams/T001/tasks")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(response.status).toBe(200);
  });

  it("should be able to get a task by its number", async () => {
    const response = await request(app)
      .get("/courses/L079/units/26719/projects/2019-2020/1/teams/T001/tasks/1")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(response.status).toBe(200);
  });

  it("should be able to update a task", async () => {
    const response = await request(app)
      .put("/courses/L079/units/26719/projects/2019-2020/1/teams/T001/tasks/1")
      .send({
        task: {
          title: "Tudinho",
          description: "Afinal vamos fazer tudo",
          start_date: "02-02-2019",
          end_date: "03-02-2019",
        },
      })
      .set("Authorization", `Bearer ${studentToken}`);
    expect(response.status).toBe(200);
  });

  it("should be able to delete a task", async () => {
    const response = await request(app)
      .delete(
        "/courses/L079/units/26719/projects/2019-2020/1/teams/T001/tasks/1"
      )
      .set("Authorization", `Bearer ${studentToken}`);
    expect(response.status).toBe(204);
  });
});
