const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { Student } = require('../factory');

describe('Student', () => {
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

	it('should be able to get all students', async () => {
		const response = await request(app)
			.get('/users/students')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(1);
	});

	it('should be able to get a student by their username', async () => {
		const response = await request(app)
			.get('/users/students/fc00001')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('should be able to update a student', async () => {
		const response = await request(app)
			.put('/users/students/fc00001')
			.send({
				student: {
					working_student: true,
				},
			})
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.working_student).toBe(true);
	});
});
