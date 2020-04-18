const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { Student, Professor, Admin } = require('../factory');

describe('User', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to create a new user', async () => {
		const response = await request(app)
			.post('/users')
			.send({
				users: [Student],
			});
		expect(response.status).toBe(201);
	});

	it('should be able to create multiple users', async () => {
		const response = await request(app)
			.post('/users')
			.send({
				users: [Student, Professor, Admin],
			});
		expect(response.status).toBe(201);
	});

	it('should be able to get all users', async () => {
		await request(app)
			.post('/users')
			.send({
				users: [Student],
			});
		const response = await request(app).get('/users');
		expect(response.body).toHaveLength(1);
		expect(response.status).toBe(200);
	});

	it('should be able to get an user by their username', async () => {
		await request(app)
			.post('/users')
			.send({
				users: [Student],
			});
		const response = await request(app).get('/users/student');
		expect(response.status).toBe(200);
	});

	it('should be able to update an user', async () => {
		await request(app)
			.post('/users')
			.send({
				users: [Student],
			});
		const response = await request(app)
			.put('/users/student')
			.send({
				user: {
					status: 'online',
				},
			});
		expect(response.status).toBe(200);
	});

	it('should be able to delete an user', async () => {
		await request(app)
			.post('/users')
			.send({
				users: [Student],
			});
		const response = await request(app).delete('/users/student');
		expect(response.status).toBe(204);
	});
});
