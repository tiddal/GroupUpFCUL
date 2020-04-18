const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { Admin } = require('../factory');

describe('Admin', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
		await request(app)
			.post('/users')
			.send({
				users: [Admin],
			});
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to get all admins', async () => {
		const response = await request(app).get('/users/admins');
		expect(response.body).toHaveLength(1);
		expect(response.status).toBe(200);
	});

	it('should be able to get an admin by their username', async () => {
		const response = await request(app).get('/users/admins/admin');
		expect(response.status).toBe(200);
	});

	it('should be able to update an admin', async () => {
		const response = await request(app)
			.put('/users/admins/admin')
			.send({
				admin: {
					previleges: 2,
				},
			});
		expect(response.body.previleges).toBe(2);
		expect(response.status).toBe(200);
	});
});
