const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, Class, Student, Professor } = require('../factory');

describe('Professor', () => {
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
			.send({ courses: [LTI] })
			.set('Authorization', `Bearer ${token}`);

		await request(app)
			.post('/courses/L079/units/26719/classes')
			.send({ classes: [Class] })
			.set('Authorization', `Bearer ${token}`);

		await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/students')
			.send({
				students: [
					{
						username: 'fc00001',
					},
				],
			})
			.set('Authorization', `Bearer ${token}`);

		await request(app)
			.post('/courses/L079/units/26719/classes/2019-2020/T1/professors')
			.send({
				professors: [
					{
						username: 'fc00002',
					},
				],
			})
			.set('Authorization', `Bearer ${token}`);
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to get all professors', async () => {
		const response = await request(app)
			.get('/users/professors')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(1);
	});

	it('should be able to get a professor by their username', async () => {
		const response = await request(app)
			.get('/users/professors/fc00002')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('should be able to update a professor', async () => {
		const response = await request(app)
			.put('/users/professors/fc00002')
			.send({
				professor: {
					room: '2.2.2',
				},
			})
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.room).toBe('2.2.2');
	});

	it('should be able to get a professors classes', async () => {
		const response = await request(app)
			.get('/users/professors/fc00002/classes/2019-2020/2')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});
});
