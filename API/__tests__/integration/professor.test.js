const request = require("supertest");
const app = require("../../app/index");
const connection = require("../../db/config/connection");

describe("Professor", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to get all Professor's information", async () => {
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
              type: "professor",
              data: {},
            },
          },
        ],
      });
    const response = await request(app).get("/users/professors");
    expect(response.status).toBe(200);
  });

  it("should be able to get a Professor's information by their username", async () => {
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
              type: "professor",
              data: {},
            },
          },
        ],
      });
    const response = await request(app).get("/users/professors/fc60000");
    expect(response.status).toBe(200);
  });

  it("should be able to update a Professors's information", async () => {
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
              type: "professor",
              data: {},
            },
          },
        ],
      });
    const response = await request(app)
      .put("/users/professors/fc60000")
      .send({
        professor: {
          room: "1.1.1",
        },
      });
    expect(response.body.room).toBe("1.1.1");
    expect(response.status).toBe(200);
  });

  it("should be able to delete a Professor", async () => {
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
    const response = await request(app).delete("/professors/fc60000");
    expect(response.status).toBe(204);
  });
});
