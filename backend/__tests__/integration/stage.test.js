const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, Project, Class, Team, Stage } = require('../factory');

describe('Stage', () => {
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
			.post('/courses/L079/units/26719/projects/2019-2020/1/stages/')
			.send({ stage: Stage });
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to add a stage to a project', async () => {
		const response = await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/stages/')
			.send({ stage: Stage });
		expect(response.status).toBe(201);
	});

	it('should be able to get all stages of a project', async () => {
		const response = await request(app).get(
			'/courses/L079/units/26719/projects/2019-2020/1/stages'
		);
		expect(response.status).toBe(200);
	});

	it('should be able to get a stage from a project by its number', async () => {
		const response = await request(app).get(
			'/courses/L079/units/26719/projects/2019-2020/1/stages/1'
		);
		expect(response.status).toBe(200);
	});

	it('should be able to update a stage', async () => {
		const response = await request(app)
			.put('/courses/L079/units/26719/projects/2019-2020/1/stages/1')
			.send({
				stage: {
					description: 'Fazer mesmo nada',
					start_date: '02-03-2019',
					end_date: '04-04-2019',
					weight: 0.5,
				},
			});
		expect(response.status).toBe(200);
	});

	it('should be able to delete a stage', async () => {
		const response = await request(app).delete(
			'/courses/L079/units/26719/projects/2019-2020/1/stages/1'
		);
		expect(response.status).toBe(204);
	});

	it('should be able to add a team to a stage', async () => {
		const response = await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/stages/1/teams')
			.send({
				team_number: 'T001',
				submission_url: 'jdfklajldfh',
			});
		expect(response.status).toBe(201);
	});

	it('should be able to get the teams from a stage', async () => {
		const response = await request(app).get(
			'/courses/L079/units/26719/projects/2019-2020/1/stages/1/teams'
		);
		expect(response.status).toBe(200);
	});

	it('should be able to get a team by its name from a stage', async () => {
		await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/stages/1/teams')
			.send({
				team_number: 'T001',
				submission_url: 'jdfklajldfh',
			});
		const response = await request(app).get(
			'/courses/L079/units/26719/projects/2019-2020/1/stages/1/teams/T001'
		);
		expect(response.status).toBe(200);
	});

	it('should be able to update the stage of a team', async () => {
		await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/stages/1/teams')
			.send({
				team_number: 'T001',
				submission_url: 'jdfklajldfh',
			});
		const response = await request(app)
			.put('/courses/L079/units/26719/projects/2019-2020/1/stages/1/teams/T001')
			.send({
				stage_grade: 20,
			});
		expect(response.status).toBe(200);
	});
});
