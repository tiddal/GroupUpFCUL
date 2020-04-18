const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, Class, Student, Professor } = require('../factory');

describe('Class', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should be able to create a new class', async () => {
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] });
		const response = await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] });
		expect(response.status).toBe(201);
	});

	it('should be able to get all classes from an unit', async () => {
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] });
		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] });
		const response = await request(app).get(
			'/courses/L079/units/26719/classes'
		);
		expect(response.status).toBe(200);
	});

	it('should be able to get a class from an unit by its academic year and number', async () => {
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] });
		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] });
		const response = await request(app).get(
			'/courses/L079/units/26719/classes/2019-2020/T1'
		);
		expect(response.status).toBe(200);
	});

	it('should be able to update a class', async () => {
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] });
		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] });
		const response = await request(app)
			.put('/courses/L079/units/26719/classes/2019-2020/T1')
			.send({
				class: {
					week_day: 7,
				},
			});
		expect(response.status).toBe(200);
	});

	it('should be able to delete a class', async () => {
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] });
		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] });
		const response = await request(app).delete(
			'/courses/L079/units/26719/classes/2019-2020/T1'
		);
		expect(response.status).toBe(204);
	});

	it('should be able to get the students from a class', async () => {
		await request(app)
			.post('/users')
			.send({ users: [Student] });
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] });
		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] });
		await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/students')
			.send({
				students: [
					{
						username: 'student',
					},
				],
			});
		const response = await request(app).get(
			'/courses/L079/units/26719/classes/2019-2020/T1/students'
		);
		expect(response.status).toBe(200);
	});

	it('should be able to add a student to a class', async () => {
		await request(app)
			.post('/users')
			.send({ users: [Student] });
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] });
		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] });
		const response = await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/students')
			.send({
				students: [
					{
						username: 'student',
					},
				],
			});
		expect(response.status).toBe(201);
	});

	it('should be able to remove a student from a class', async () => {
		await request(app)
			.post('/users')
			.send({ users: [Student] });
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] });
		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] });
		await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/students')
			.send({
				students: [
					{
						username: 'student',
					},
				],
			});
		const response = await request(app).delete(
			'/courses/L079/units/26719/classes/2019-2020/T1/students/student'
		);
		expect(response.status).toBe(204);
	});

	it('should be able to get the professors from a class', async () => {
		await request(app)
			.post('/users')
			.send({ users: [Professor] });
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] });
		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] });
		await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/professors')
			.send({
				professors: [
					{
						username: 'professor',
					},
				],
			});
		const response = await request(app).get(
			'/courses/L079/units/26719/classes/2019-2020/T1/professors'
		);
		expect(response.status).toBe(200);
	});

	it('should be able to add a professor to a class', async () => {
		await request(app)
			.post('/users')
			.send({ users: [Professor] });
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] });
		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] });
		const response = await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/professors')
			.send({
				professors: [
					{
						username: 'professor',
					},
				],
			});
		expect(response.status).toBe(201);
	});

	it('should be able to remove a professor from a class', async () => {
		await request(app)
			.post('/users')
			.send({ users: [Professor] });
		await request(app)
			.post('/courses')
			.send({ courses: [LTI] });
		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] });
		await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/professors')
			.send({
				professors: [
					{
						username: 'professor',
					},
				],
			});
		const response = await request(app).delete(
			'/courses/L079/units/26719/classes/2019-2020/T1/professors/professor'
		);
		expect(response.status).toBe(204);
	});
});
