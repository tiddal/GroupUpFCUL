const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, Class, Student, Professor } = require('../factory');

describe('Class', () => {
	let adminToken;
	let studentToken;
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
		await connection.seed.run();

		// Authenticate Admin
		({
			body: { token: adminToken },
		} = await request(app)
			.post('/authenticate')
			.send({
				user: {
					email: 'fc00000@test.com',
					password: 'password',
				},
			}));
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] })
			.set('Authorization', `Bearer ${adminToken}`);

		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] })
			.set('Authorization', `Bearer ${adminToken}`);

		await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/students')
			.send({
				students: [
					{
						username: 'fc00001',
					},
				],
			})
			.set('Authorization', `Bearer ${adminToken}`);

		await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/professors')
			.send({
				students: [
					{
						username: 'fc00002',
					},
				],
			})
			.set('Authorization', `Bearer ${adminToken}`);

		// Authenticate Student
		({
			body: { token: studentToken },
		} = await request(app)
			.post('/authenticate')
			.send({
				user: {
					email: 'fc00001@test.com',
					password: 'password',
				},
			}));
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to create a new class', async () => {
		const response = await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [{ ...Class, number: 'TP1' }] })
			.set('Authorization', `Bearer ${adminToken}`);
		expect(response.status).toBe(201);
	});

	it('should be able to get all classes from an unit', async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719/classes')
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to get all classes from an unit from an academic year', async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719/classes/2019-2020')
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to get a class from an unit by its academic year and number', async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719/classes/2019-2020/T1')
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to update a class', async () => {
		const response = await request(app)
			.put('/courses/L079/units/26719/classes/2019-2020/T1')
			.send({
				class: {
					week_day: 7,
				},
			})
			.set('Authorization', `Bearer ${adminToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to delete a class', async () => {
		const response = await request(app)
			.delete('/courses/L079/units/26719/classes/2019-2020/T1')
			.set('Authorization', `Bearer ${adminToken}`);
		expect(response.status).toBe(204);
	});

	it('should be able to get the students from a class', async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719/classes/2019-2020/T1/students')
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to add a student to a class', async () => {
		await request(app)
			.post('/users')
			.send({ users: [Student] })
			.set('Authorization', `Bearer ${adminToken}`);
		const response = await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/students')
			.send({
				students: [
					{
						username: 'student',
					},
				],
			})
			.set('Authorization', `Bearer ${adminToken}`);
		expect(response.status).toBe(201);
	});

	it('should be able to remove a student from a class', async () => {
		const response = await request(app)
			.delete('/courses/L079/units/26719/classes/2019-2020/T1/students/fc00001')
			.set('Authorization', `Bearer ${adminToken}`);
		expect(response.status).toBe(204);
	});

	it('should be able to get the professors from a class', async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719/classes/2019-2020/T1/professors')
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to add a professor to a class', async () => {
		await request(app)
			.post('/users')
			.send({ users: [Professor] })
			.set('Authorization', `Bearer ${adminToken}`);
		const response = await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/professors')
			.send({
				professors: [
					{
						username: 'professor',
					},
				],
			})
			.set('Authorization', `Bearer ${adminToken}`);
		expect(response.status).toBe(201);
	});

	it('should be able to remove a professor from a class', async () => {
		const response = await request(app)
			.delete(
				'/courses/L079/units/26719/classes/2019-2020/T1/professors/fc00002'
			)
			.set('Authorization', `Bearer ${adminToken}`);
		expect(response.status).toBe(204);
	});
});
