const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { Admin } = require('../factory');

describe('Admin', () => {
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
					email: 'fc00000@test.com',
					password: 'password',
				},
			}));
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to get all admins', async () => {
		const response = await request(app)
			.get('/users/admins')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(1);
	});

	it('should be able to get an admin by their username', async () => {
		const response = await request(app)
			.get('/users/admins/fc00000')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.username).toBe('fc00000');
	});

	it('should be able to update an admin', async () => {
		const response = await request(app)
			.put('/users/admins/fc00000')
			.send({
				admin: {
					previleges: 2,
				},
			})
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.previleges).toBe(2);
	});
});
