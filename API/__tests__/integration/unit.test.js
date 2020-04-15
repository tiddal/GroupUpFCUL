const request = require("supertest");
const app = require("../../app/index");
const connection = require("../../db/config/connection");

describe("Units", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    await connection.destroy();
  });

  it("should be able to create a new Unit", async () => {
    const response = await request(app)
      .post("/courses/11111/units")
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
    expect(response.status).toBe(201);
  });

  it("should be able to get all the Units information", async () => {
    const create = await request(app)
      .post("/courses/11111/units")
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
    const response = await request(app).get("/courses/L111/units");
    expect(response.status).toBe(200);
  });

  it("should be able to get a Unit's information by it's code", async () => {
    const create = await request(app)
      .post("/courses/11111/units")
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
    const response = await request(app).get("/courses/L111/units/11111");
    expect(response.status).toBe(200);
  });

  it("should be able to update a Unit's information", async () => {
    const create = await request(app)
      .post("/courses/11111/units")
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
    const response = await request(app)
      .put("/units/11111")
      .send({
        unit: {
          name: "Example",
          semester: 5,
          initials: "EX",
          ects: 3,
        },
      });
    expect(response.status).toBe(200);
  });

  it("should be able to delete a Unit", async () => {
    const create = await request(app)
      .post("/courses/11111/units")
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
    const response = await request(app).delete("/courses/L111/units/1111");
    expect(response.status).toBe(204);
  });
});
