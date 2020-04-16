const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, Project } = require('../factory');

describe('Stage', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should be able to create a new Stage', async () => {
		const createUnit = await request(app)
			.post('/courses')
			.send({
				courses: [
					{
						code: 'L111',
						name: 'Course One',
						cycle: 1,
						initials: 'C1',
						units: [
							{
								code: 11111,
								name: 'Unit One',
								semester: 1,
								initials: 'U1',
								ects: 6,
							},
						],
					},
				],
			});
		const createProject = await request(app)
			.post('/courses/L111/units/1111/projects')
			.send({
				project: {
					name: 'Nada',
					academic_year: '2019-2020',
					min_students: 0,
					max_students: 2,
					description: 'Nothing',
					objectives: 'None',
					assignment_url: 'assignment.pdf',
					stages: [
						{
							description: 'Fazer absolutamente nada',
							start_date: '01-03-2019',
							end_date: '02-04-2019',
							weight: 1,
						},
					],
				},
			});
		const response = await request(app)
			.post('/courses/L111/units/1111/projects/2019-2020/1/stages/')
			.send({
				stage: {
					description: 'Fazer absolutamente nada',
					start_date: '01-03-2019',
					end_date: '02-04-2019',
					weight: 1,
				},
			});
		expect(response.status).toBe(201);
	});

	it("should be able to get all Stage's information", async () => {
		const createUnit = await request(app)
			.post('/courses')
			.send({
				courses: [
					{
						code: 'L111',
						name: 'Course One',
						cycle: 1,
						initials: 'C1',
						units: [
							{
								code: 11111,
								name: 'Unit One',
								semester: 1,
								initials: 'U1',
								ects: 6,
							},
						],
					},
				],
			});
		const createProject = await request(app)
			.post('/courses/L111/units/1111/projects')
			.send({
				project: {
					name: 'Nada',
					academic_year: '2019-2020',
					min_students: 0,
					max_students: 2,
					description: 'Nothing',
					objectives: 'None',
					assignment_url: 'assignment.pdf',
					stages: [
						{
							description: 'Fazer absolutamente nada',
							start_date: '01-03-2019',
							end_date: '02-04-2019',
							weight: 1,
						},
					],
				},
			});
		const createStage = await request(app)
			.post('/courses/L111/units/1111/projects/2019-2020/1/stages/')
			.send({
				stage: {
					description: 'Fazer absolutamente nada',
					start_date: '01-03-2019',
					end_date: '02-04-2019',
					weight: 1,
				},
			});
		const response = await request(app).get(
			'/courses/L111/units/1111/projects/2019-2020/1/stages/1'
		);
		expect(response.status).toBe(200);
	});

	it("should be able to get a Stage's information by their id", async () => {
		const createUnit = await request(app)
			.post('/courses')
			.send({
				courses: [
					{
						code: 'L111',
						name: 'Course One',
						cycle: 1,
						initials: 'C1',
						units: [
							{
								code: 11111,
								name: 'Unit One',
								semester: 1,
								initials: 'U1',
								ects: 6,
							},
						],
					},
				],
			});
		const createProject = await request(app)
			.post('/courses/L111/units/1111/projects')
			.send({
				project: {
					name: 'Nada',
					academic_year: '2019-2020',
					min_students: 0,
					max_students: 2,
					description: 'Nothing',
					objectives: 'None',
					assignment_url: 'assignment.pdf',
					stages: [
						{
							description: 'Fazer absolutamente nada',
							start_date: '01-03-2019',
							end_date: '02-04-2019',
							weight: 1,
						},
					],
				},
			});
		const createStage = await request(app)
			.post('/courses/L111/units/1111/projects/2019-2020/1/stages/')
			.send({
				stage: {
					description: 'Fazer absolutamente nada',
					start_date: '01-03-2019',
					end_date: '02-04-2019',
					weight: 1,
				},
			});
		const response = await request(app).get(
			'/courses/L111/units/1111/projects/2019-2020/1'
		);
		expect(response.status).toBe(200);
	});

	it("should be able to update a Stage's information", async () => {
		const createUnit = await request(app)
			.post('/courses')
			.send({
				courses: [
					{
						code: 'L111',
						name: 'Course One',
						cycle: 1,
						initials: 'C1',
						units: [
							{
								code: 11111,
								name: 'Unit One',
								semester: 1,
								initials: 'U1',
								ects: 6,
							},
						],
					},
				],
			});
		const createProject = await request(app)
			.post('/courses/L111/units/1111/projects')
			.send({
				project: {
					name: 'Nada',
					academic_year: '2019-2020',
					min_students: 0,
					max_students: 2,
					description: 'Nothing',
					objectives: 'None',
					assignment_url: 'assignment.pdf',
					stages: [
						{
							description: 'Fazer absolutamente nada',
							start_date: '01-03-2019',
							end_date: '02-04-2019',
							weight: 1,
						},
					],
				},
			});
		const createStage = await request(app)
			.post('/courses/L111/units/1111/projects/2019-2020/1/stages/')
			.send({
				stage: {
					description: 'Fazer absolutamente nada',
					start_date: '01-03-2019',
					end_date: '02-04-2019',
					weight: 1,
				},
			});
		const response = await request(app)
			.put('/courses/L111/units/1111/projects/2019-2020/1/stages/1')
			.send({
				stage: {
					description: 'Fazer mesmo nada',
					start_date: '02-03-2019',
					end_date: '04-04-2019',
					weight: 0.5,
				},
			});
		expect(response.status).toBe(200);
	});

	it('should be able to delete a Stage', async () => {
		const createUnit = await request(app)
			.post('/courses')
			.send({
				courses: [
					{
						code: 'L111',
						name: 'Course One',
						cycle: 1,
						initials: 'C1',
						units: [
							{
								code: 11111,
								name: 'Unit One',
								semester: 1,
								initials: 'U1',
								ects: 6,
							},
						],
					},
				],
			});
		const createProject = await request(app)
			.post('/courses/L111/units/1111/projects')
			.send({
				project: {
					name: 'Nada',
					academic_year: '2019-2020',
					min_students: 0,
					max_students: 2,
					description: 'Nothing',
					objectives: 'None',
					assignment_url: 'assignment.pdf',
					stages: [
						{
							description: 'Fazer absolutamente nada',
							start_date: '01-03-2019',
							end_date: '02-04-2019',
							weight: 1,
						},
					],
				},
			});
		const createStage = await request(app)
			.post('/courses/L111/units/1111/projects/2019-2020/1/stages/')
			.send({
				stage: {
					description: 'Fazer absolutamente nada',
					start_date: '01-03-2019',
					end_date: '02-04-2019',
					weight: 1,
				},
			});
		const response = await request(app).delete(
			'/courses/L111/units/1111/projects/2019-2020/1/stages/1'
		);
		expect(response.status).toBe(204);
	});
});
