const request = require("supertest");
const app = require("../../app/index");
const connection = require("../../db/config/connection");

describe("Admin", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to get all Admin's information", async () => {
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
    const response = await request(app).get("/users/admins");
    expect(response.status).toBe(201);
  });

  it("should be able to get a Admin's information by their username", async () => {
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
    const response = await request(app).get("/users/admins/fcAdmin");
    expect(response.status).toBe(200);
  });

  it("should be able to update a Admin's information", async () => {
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
      .put("/users/admins/fcAdmin")
      .send({
        admin: {
          previleges: 1,
        },
      });
    expect(response.status).toBe(200);
  });
});
