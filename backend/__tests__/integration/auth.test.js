const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { Admin } = require('../factory');

describe('Auth', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
		await connection.seed.run();
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to log an user in', async () => {
		const response = await request(app)
			.post('/authenticate')
			.send({
				user: {
					email: 'admin@test.com',
					password: 'password',
				},
			});
		expect(response.status).toBe(200);
	});

	it('should return a token when authenticated', async () => {
		const response = await request(app)
			.post('/authenticate')
			.send({
				user: {
					email: 'admin@test.com',
					password: 'password',
				},
			});
		expect(response.body).toHaveProperty('token');
		expect(response.status).toBe(200);
	});

	it('should not be able to log an user in giving a wrong password', async () => {
		const response = await request(app)
			.post('/authenticate')
			.send({
				user: {
					email: 'admin@test.com',
					password: 'wrongpassword',
				},
			});
		expect(response.status).toBe(401);
	});

	it('should not be able to log an user in giving a wrong email', async () => {
		const response = await request(app)
			.post('/authenticate')
			.send({
				user: {
					email: 'wrongemail@test.com',
					password: 'password',
				},
			});
		expect(response.status).toBe(401);
	});
});
