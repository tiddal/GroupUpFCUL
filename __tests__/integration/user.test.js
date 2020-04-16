const request = require("supertest");
const app = require("../../app/index");
const connection = require("../../db/config/connection");

describe("User", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new User", async () => {
    const response = await request(app)
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
    expect(response.status).toBe(201);
  });

  it("should be able to get all User's information", async () => {
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
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
  });

  it("should be able to get a User's information by their username", async () => {
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
    const response = await request(app).get("/users/fc60000");
    expect(response.status).toBe(200);
  });

  it("should be able to update a User's information", async () => {
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
      .put("/users/fc60000")
      .send({
        user: {
          status: "online",
        },
      });
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  it("should be able to delete a User", async () => {
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
    const response = await request(app).delete("/users/fc60000");
    expect(response.status).toBe(204);
  });
});
