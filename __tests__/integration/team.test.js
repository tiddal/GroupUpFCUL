const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, Project, Class, Team, Student } = require('../factory');

describe('Team', () => {
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
					email: 'fc00000@test.com',
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
					email: 'fc00002@test.com',
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
					email: 'fc00001@test.com',
					password: 'password',
				},
			}));
		await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/teams')
			.send({ team: Team })
			.set('Authorization', `Bearer ${studentToken}`);
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to create a new team', async () => {
		const response = await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/teams')
			.send({ team: Team })
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(201);
	});

	it('should be able to get all teams from a project', async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719/projects/2019-2020/1/teams')
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to get a team by its number', async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719/projects/2019-2020/1/teams/T001')
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to update a team', async () => {
		const response = await request(app)
			.put('/courses/L079/units/26719/projects/2019-2020/1/teams/T001')
			.send({
				team: {
					name: '20Evitoria',
					description: 'Afinal queremos 20',
					logo_url: '20virgula0.png',
				},
			})
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to delete a team', async () => {
		const response = await request(app)
			.delete('/courses/L079/units/26719/projects/2019-2020/1/teams/T001')
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(204);
	});

	it('should be able to add a student to a team', async () => {
		const response = await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/teams/T001/members')
			.send({ username: 'fc00001' });
		expect(response.status).toBe(201);
	});

	it('should be able to get the members of a team', async () => {
		const response = await request(app).get(
			'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/members'
		);
		expect(response.status).toBe(200);
	});

	it('should be able to update a member of a team', async () => {
		const response = await request(app)
			.put(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/members/fc00001'
			)
			.send({ role: 'member' });
		expect(response.status).toBe(200);
	});

	it('should be able to remove a member from a team', async () => {
		const response = await request(app).get(
			'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/fc00001'
		);
		expect(response.status).toBe(204);
	});
});
