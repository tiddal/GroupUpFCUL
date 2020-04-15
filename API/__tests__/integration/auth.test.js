const request = require("supertest");
const app = require("../../app/index");
const connection = require("../../db/config/connection");

describe("Auth", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to login", async () => {
    const create = await request(app)
      .post("/users")
      .send({
        users: [
          {
            username: "fcAdmin",
            first_name: "Test",
            last_name: "Admin",
            email: "fcAdmin@admins.fc.ul.pt",
            password: "password",
            role: {
              type: "admin",
              data: {
                previleges: 1,
              },
            },
          },
        ],
      });
    const response = await request(app)
      .post("/auth/login")
      .send({
        user: {
          email: "fcAdmin@admins.fc.ul.pt",
          password: "password",
        },
      });
    expect(response.status).toBe(200);
  });

  it("should be able to logout", async () => {
    const create = await request(app)
      .post("/users")
      .send({
        users: [
          {
            username: "fcAdmin",
            first_name: "Test",
            last_name: "Admin",
            email: "fcAdmin@admins.fc.ul.pt",
            password: "password",
            role: {
              type: "admin",
              data: {
                previleges: 1,
              },
            },
          },
        ],
      });
    const response = await request(app).get("/auth/logout");
    expect(response.status).toBe(200);
  });

  it("should be able to validate session", async () => {
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
});
