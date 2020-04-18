const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { Admin } = require('../factory');

describe('Auth', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to log an user in', async () => {
		await request(app)
			.post('/users')
			.send({
				users: [Admin],
			});
		const response = await request(app)
			.post('/auth/login')
			.send({
				user: {
					email: 'admin@test.com',
					password: 'K0Zv4yQYnoKVvLj',
				},
			});
		expect(response.status).toBe(200);
	});
});
