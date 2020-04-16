const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { Unit, LTI } = require('../factory');

describe('Units', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should be able to create a new unit', async () => {
		await request(app)
			.post('/courses')
			.send({
				courses: [LTI],
			});
		const response = await request(app)
			.post('/courses/L079/units')
			.send({
				units: [Unit],
			});
		expect(response.status).toBe(201);
	});

	it('should be able to get all the units', async () => {
		await request(app)
			.post('/courses')
			.send({
				courses: [LTI],
			});
		const response = await request(app).get('/courses/L079/units');
		expect(response.status).toBe(200);
	});

	it("should be able to get an unit by it's code", async () => {
		await request(app)
			.post('/courses')
			.send({
				courses: [LTI],
			});
		const response = await request(app).get('/courses/L079/units/26719');
		expect(response.status).toBe(200);
	});

	it('should be able to update an unit', async () => {
		await request(app)
			.post('/courses')
			.send({
				courses: [LTI],
			});
		const response = await request(app)
			.put('/courses/L079/units/26719')
			.send({
				unit: {
					name: 'Example',
					semester: 5,
					initials: 'EX',
					ects: 3,
				},
			});
		expect(response.status).toBe(200);
	});

	it('should be able to delete a Unit', async () => {
		await request(app)
			.post('/courses')
			.send({
				courses: [LTI],
			});
		const response = await request(app).delete('/courses/L079/units/26719');
		expect(response.status).toBe(204);
	});
});
