const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, Project, Class, Team, Student } = require('../factory');

describe('Question', () => {
	let adminToken;
	let professorToken;
	let studentToken;
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
		await connection.seed.run();
		({
			body: { token: adminToken },
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
				professors: [
					{
						username: 'fc00002',
					},
				],
			})
			.set('Authorization', `Bearer ${adminToken}`);

		await request(app)
			.post('/users')
			.send({
				users: [Student],
			})
			.set('Authorization', `Bearer ${adminToken}`);

		({
			body: { token: professorToken },
		} = await request(app)
			.post('/authenticate')
			.send({
				user: {
					email: 'professor@test.com',
					password: 'password',
				},
			}));
		await request(app)
			.post('/courses/L079/units/26719/projects')
			.send({ project: Project })
			.set('Authorization', `Bearer ${professorToken}`);

		({
			body: { token: studentToken },
		} = await request(app)
			.post('/authenticate')
			.send({
				user: {
					email: 'student@test.com',
					password: 'password',
				},
			}));
		await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/teams')
			.send({ team: Team })
			.set('Authorization', `Bearer ${studentToken}`);

		await request(app)
			.post(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/questions/'
			)
			.send({ question: { message: 'nao fiz nada' } })
			.set('Authorization', `Bearer ${studentToken}`);

		await request(app)
			.post(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/questions/'
			)
			.send({ question: { message: 'é suposto fazer cenas' } })
			.set('Authorization', `Bearer ${professorToken}`);
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to create a new question', async () => {
		const response = await request(app)
			.post(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/questions/'
			)
			.send({ question: { message: 'nao fiz nada' } })
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(201);
	});

	it('should be able to get all questions from a team', async () => {
		const response = await request(app)
			.get(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/questions'
			)
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});
});
