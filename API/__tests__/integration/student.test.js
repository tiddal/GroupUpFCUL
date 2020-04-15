const request = require("supertest");
const app = require("../../app/index");
const connection = require("../../db/config/connection");

describe("Student", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to get all Student's information", async () => {
    const create = await request(app)
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
    const response = await request(app).get("/users/students");
    expect(response.status).toBe(200);
  });

  it("should be able to get a Student's information by their username", async () => {
    const create = await request(app)
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
    const response = await request(app).get("/users/students/fc60000");
    expect(response.status).toBe(200);
  });

  it("should be able to update a Student's information", async () => {
    const create = await request(app)
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
    const response = await request(app)
      .put("/users/students/fc60000")
      .send({
        student: {
          working_student: true,
        },
      });
    expect(response.body.working_student).toBe(true);
    expect(response.status).toBe(200);
  });

  it("should be able to delete a Student", async () => {
    const create = await request(app)
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
    const response = await request(app).delete("/students/fc60000");
    expect(response.status).toBe(204);
  });
});
