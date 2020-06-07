const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { Unit, LTI } = require('../factory');

describe('Units', () => {
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
					email: 'admin@test.com',
					password: 'password',
				},
			}));
		await request(app)
			.post('/courses')
			.send({
				courses: [LTI],
			})
			.set('Authorization', `Bearer ${token}`);
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to create a new unit', async () => {
		const response = await request(app)
			.post('/courses/L079/units')
			.send({
				units: [Unit],
			})
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(201);
	});

	it('should be able to get all the units', async () => {
		const response = await request(app)
			.get('/courses/L079/units')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it("should be able to get an unit by it's code", async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('should be able to update an unit', async () => {
		const response = await request(app)
			.put('/courses/L079/units/26719')
			.send({
				unit: {
					name: 'Example',
					semester: 5,
					initials: 'EX',
					ects: 3,
				},
			})
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('should be able to delete a Unit', async () => {
		const response = await request(app)
			.delete('/courses/L079/units/26719')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(204);
	});

	it('should be able to get all Unit', async () => {
		const response = await request(app)
			.get('/units')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});
});
