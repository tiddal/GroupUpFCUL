const request = require("supertest");
const app = require("../../app/index");
const connection = require("../../db/config/connection");

describe("Project", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new Project", async () => {
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
    const response = await request(app)
      .post("/courses/L111/units/1111/projects/")
      .send({
        project: {
          name: "Nada",
          academic_year: "2019-2020",
          min_students: 1,
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
    expect(response.status).toBe(201);
  });

  it("should be able to get all Project's information", async () => {
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
          min_students: 1,
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
    const response = await request(app).get(
      "/courses/L111/units/1111/projects"
    );
    expect(response.status).toBe(200);
  });

  it("should be able to get a Project's information by their academic year", async () => {
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
          min_students: 1,
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
    const response = await request(app).get(
      "/courses/L111/units/1111/projects/2019-2020"
    );
    expect(response.status).toBe(200);
  });

  it("should be able to get a Project's information by their id", async () => {
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
          min_students: 1,
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
    const response = await request(app).get(
      "/courses/L111/units/1111/projects/2019-2020/1"
    );
    expect(response.status).toBe(200);
  });

  it("should be able to update a Project's information", async () => {
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
          min_students: 1,
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
      .put("/courses/L111/units/1111/projects/2019-2020/1")
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

  it("should be able to delete a Student", async () => {
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
    const response = await request(app).delete(
      "/courses/L111/units/1111/projects/2019-2020/1"
    );
    expect(response.status).toBe(204);
  });
});
