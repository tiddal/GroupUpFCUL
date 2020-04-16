const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, LEI } = require('../factory');

describe('Course', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should be able to create a course', async () => {
		const response = await request(app)
			.post('/courses')
			.send({
				courses: [LTI],
			});
		expect(response.status).toBe(201);
	});

	it('should be able to create multiple courses', async () => {
		const response = await request(app)
			.post('/courses')
			.send({
				courses: [LTI, LEI],
			});
		expect(response.status).toBe(201);
	});

	it('should be able to get all courses', async () => {
		await request(app)
			.post('/courses')
			.send({
				courses: [LTI, LEI],
			});
		const response = await request(app).get('/courses');
		expect(response.body).toHaveLength(2);
		expect(response.status).toBe(200);
	});

	it('should be able to get a course by its code', async () => {
		await request(app)
			.post('/courses')
			.send({
				courses: [LTI],
			});
		const response = await request(app).get('/courses/L079');
		expect(response.status).toBe(200);
	});

	it('should be able to update a course', async () => {
		await request(app)
			.post('/courses')
			.send({
				courses: [LTI],
			});
		const response = await request(app)
			.put('/courses/L079')
			.send({
				course: {
					name: 'Engenharia Informática',
					initials: 'LEI',
				},
			});
		expect(response.status).toBe(200);
	});

	it('should be able to delete a course', async () => {
		await request(app)
			.post('/courses')
			.send({
				courses: [LEI],
			});
		const response = await request(app).delete('/courses/9119');
		expect(response.status).toBe(204);
	});
});
