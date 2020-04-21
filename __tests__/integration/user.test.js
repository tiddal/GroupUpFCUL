const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { Student, Professor, Admin } = require('../factory');

describe('User', () => {
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

	it('should be able to create a new user', async () => {
		const response = await request(app)
			.post('/users')
			.send({
				users: [Student],
			})
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(201);
	});

	it('should be able to create multiple users', async () => {
		const response = await request(app)
			.post('/users')
			.send({
				users: [Student, Professor, Admin],
			})
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(201);
	});

	it('should be able to get all users', async () => {
		const response = await request(app)
			.get('/users')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(3);
	});

	it('should be able to get an user by their username', async () => {
		const response = await request(app)
			.get('/users/fc00001')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('should be able to update an user', async () => {
		const response = await request(app)
			.put('/users/fc00001')
			.send({
				user: {
					status: 'online',
				},
			})
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('should be able to delete an user', async () => {
		const response = await request(app)
			.delete('/users/fc00001')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(204);
	});
});
