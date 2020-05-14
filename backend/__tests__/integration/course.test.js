const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, LEI } = require('../factory');

describe('Course', () => {
	let token;
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
		await connection.seed.run();
		({
			body: { token },
		} = await request(app)
			.post('/authenticate')
			.send({
				user: {
					email: 'admin@test.com',
					password: 'password',
				},
			}));
		await request(app)
			.post('/courses')
			.send({
				courses: [LTI],
			})
			.set('Authorization', `Bearer ${token}`);
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to create a course', async () => {
		const response = await request(app)
			.post('/courses')
			.send({
				courses: [LEI],
			})
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(201);
	});

	it('should be able to get all courses', async () => {
		const response = await request(app)
			.get('/courses')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('should be able to get a course by its code', async () => {
		const response = await request(app)
			.get('/courses/L079')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('should be able to update a course', async () => {
		const response = await request(app)
			.put('/courses/L079')
			.send({
				course: {
					name: 'Engenharia Informática',
					initials: 'LEI',
				},
			})
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('should be able to delete a course', async () => {
		const response = await request(app)
			.delete('/courses/L079')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(204);
	});
});
