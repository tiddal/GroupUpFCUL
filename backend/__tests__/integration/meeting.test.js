const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, Project, Class, Team, Student, Meeting } = require('../factory');

describe('Meeting', () => {
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
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/meetings'
			)
			.send({ meeting: Meeting })
			.set('Authorization', `Bearer ${studentToken}`);
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to create a new meeting', async () => {
		const response = await request(app)
			.post(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/meetings'
			)
			.send({ meeting: Meeting })
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(201);
	});

	it('should be able to get all meetings from a team', async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719/projects/2019-2020/1/teams/T001/meetings')
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to get a meeting by its number', async () => {
		const response = await request(app)
			.get(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/meetings/1'
			)
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to update a meeting', async () => {
		const response = await request(app)
			.put(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/meetings/1'
			)
			.send({
				meeting: {
					topic: 'Como ter o 19,9 em menos de 48h',
					begins_at: '02-03-2019 16:00',
					ends_at: '02-03-2019 17:30',
				},
			})
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to delete a meeting', async () => {
		const response = await request(app)
			.delete(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/meetings/1'
			)
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(204);
	});

	it('should be able to add a student to a meeting', async () => {
		const response = await request(app)
			.post(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/meetings/1/members'
			)
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(201);
	});

	it('should be able to get the members of a team on the meeting', async () => {
		const response = await request(app)
			.get(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/meetings/1/members'
			)
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to remove a member from a meeting', async () => {
		await request(app)
			.post(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/meetings/1/members'
			)
			.set('Authorization', `Bearer ${studentToken}`);
		const response = await request(app)
			.delete(
				'/courses/L079/units/26719/projects/2019-2020/1/teams/T001/meetings/1/members/fc00001'
			)
			.set('Authorization', `Bearer ${studentToken}`);
		expect(response.status).toBe(204);
	});
});
