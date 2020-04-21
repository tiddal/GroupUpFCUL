const request = require("supertest");
const app = require("../../API/app");
const connection = require("../../API/db/config/connection");
const { LTI, Project } = require("../factory");

describe("Project", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    await request(app)
      .post("/courses")
      .send({
        courses: [LTI],
      });
  });

  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });

  it("should be able to create a new project", async () => {
    const response = await request(app)
      .post("/courses/L079/units/26719/projects/")
      .send({ project: { ...Project } });
    expect(response.status).toBe(201);
  });

  it("should be able to get all projects from a unit", async () => {
    await request(app)
      .post("/courses/L079/units/26719/projects/")
      .send({ project: { ...Project } });
    const response = await request(app).get(
      "/courses/L079/units/26719/projects/"
    );
    expect(response.body[0].length).toBe(1);
  });

  it("should be able to get all projects from an academic year", async () => {
    await request(app)
      .post("/courses/L079/units/26719/projects/")
      .send({ project: { ...Project } });
    const response = await request(app).get(
      "/courses/L079/units/26719/projects/2019-2020"
    );
    expect(response.status).toBe(200);
  });

  it("should be able to get a project by its id", async () => {
    await request(app)
      .post("/courses/L079/units/26719/projects/")
      .send({ project: { ...Project } });
    const response = await request(app).get(
      "/courses/L079/units/26719/projects/2019-2020/1"
    );
    expect(response.status).toBe(200);
  });

  it("should be able to update a project", async () => {
    await request(app)
      .post("/courses/L079/units/26719/projects/")
      .send({ project: { ...Project } });
    const response = await request(app)
      .put("/courses/L079/units/26719/projects/2019-2020/1")
      .send({
        project: {
          name: "Tudo",
          min_students: 2,
          max_students: 3,
          description: "Everything",
          objectives: "All",
          assingment_url: "betterAssignment.pdf",
        },
      });
    expect(response.status).toBe(200);
  });

  it("should be able to delete a project", async () => {
    await request(app)
      .post("/courses/L079/units/26719/projects/")
      .send({ project: { ...Project } });
    const response = await request(app).delete(
      "/courses/L079/units/26719/projects/2019-2020/1"
    );
    expect(response.status).toBe(204);
  });
});
