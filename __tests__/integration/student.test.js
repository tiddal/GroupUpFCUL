const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { Student } = require('../factory');

describe('Student', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
		await request(app)
			.post('/users')
			.send({
				users: [Student],
			});
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to get all students', async () => {
		const response = await request(app).get('/users/students');
		expect(response.body).toHaveLength(1);
		expect(response.status).toBe(200);
	});

	it('should be able to get a student by their username', async () => {
		const response = await request(app).get('/users/students/student');
		expect(response.status).toBe(200);
	});

	it('should be able to update a student', async () => {
		const response = await request(app)
			.put('/users/students/student')
			.send({
				student: {
					working_student: true,
				},
			});
		expect(response.body.working_student).toBe(true);
		expect(response.status).toBe(200);
	});
});
