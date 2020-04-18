const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { Professor } = require('../factory');

describe('Professor', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
		await request(app)
			.post('/users')
			.send({
				users: [Professor],
			});
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to get all professors', async () => {
		const response = await request(app).get('/users/professors');
		expect(response.body).toHaveLength(1);
		expect(response.status).toBe(200);
	});

	it('should be able to get a professor by their username', async () => {
		const response = await request(app).get('/users/professors/professor');
		expect(response.status).toBe(200);
	});

	it('should be able to update a professor', async () => {
		const response = await request(app)
			.put('/users/professors/professor')
			.send({
				professor: {
					room: '2.2.2',
				},
			});
		expect(response.body.room).toBe('2.2.2');
		expect(response.status).toBe(200);
	});
});
