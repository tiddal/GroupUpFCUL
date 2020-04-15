const request = require("supertest");
const app = require("../../app/index");
const connection = require("../../db/config/connection");

describe("Course", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    await connection.destroy();
  });

  it("should be able to create Courses", async () => {
    const response = await request(app)
      .post("/courses")
      .send({
        courses: [
          {
            code: "L079",
            name: "Tecnologias de Informação",
            cycle: 1,
            initials: "LTI",
            units: [
              {
                code: 26719,
                name: "Projeto de Tecnologias de Informação",
                semester: 6,
                initials: "PTI",
                ects: 6,
              },
            ],
          },
        ],
      });
    expect(response.status).toBe(201);
  });

  it("should be able to get all Courses' information", async () => {
    const create = await request(app)
      .post("/courses")
      .send({
        courses: [
          {
            code: "L079",
            name: "Tecnologias de Informação",
            cycle: 1,
            initials: "LTI",
            units: [
              {
                code: 26719,
                name: "Projeto de Tecnologias de Informação",
                semester: 6,
                initials: "PTI",
                ects: 6,
              },
            ],
          },
        ],
      });
    const response = await request(app).get("/courses");
    expect(response.status).toBe(200);
  });

  it("should be able to get a Course's information by their code", async () => {
    const create = await request(app)
      .post("/courses")
      .send({
        courses: [
          {
            code: "L079",
            name: "Tecnologias de Informação",
            cycle: 1,
            initials: "LTI",
            units: [
              {
                code: 26719,
                name: "Projeto de Tecnologias de Informação",
                semester: 6,
                initials: "PTI",
                ects: 6,
              },
            ],
          },
        ],
      });
    const response = await request(app).get("/L079");
    expect(response.status).toBe(200);
  });

  it("should be able to update a Course's information", async () => {
    const create = await request(app)
      .post("/courses")
      .send({
        courses: [
          {
            code: "L079",
            name: "Tecnologias de Informação",
            cycle: 1,
            initials: "LTI",
            units: [
              {
                code: 26719,
                name: "Projeto de Tecnologias de Informação",
                semester: 6,
                initials: "PTI",
                ects: 6,
              },
            ],
          },
        ],
      });
    const response = await request(app)
      .put("courses/L079")
      .send({
        course: {
          name: "Tecnologias de Informação",
          initials: "LTI",
        },
      });
    expect(response.status).toBe(200);
  });

  it("should be able to delete a Course", async () => {
    const create = await request(app)
      .post("/courses")
      .send({
        courses: [
          {
            code: "L079",
            name: "Tecnologias de Informação",
            cycle: 1,
            initials: "LTI",
            units: [
              {
                code: 26719,
                name: "Projeto de Tecnologias de Informação",
                semester: 6,
                initials: "PTI",
                ects: 6,
              },
            ],
          },
        ],
      });
    const response = await request(app).delete("/courses/L079");
    expect(response.status).toBe(204);
  });
});
