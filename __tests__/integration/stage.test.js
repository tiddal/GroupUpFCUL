const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, Project, Stage } = require('../factory');

describe('Stage', () => {
	let adminToken;
	let professorToken;
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
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to add a stage to a project', async () => {
		const response = await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/stages/')
			.send({ stage: { ...Stage } });
		expect(response.status).toBe(201);
	});

	it('should be able to get all stages of a project', async () => {
		await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/stages/')
			.send({ stage: { ...Stage } });
		const response = await request(app).get(
			'/courses/L079/units/26719/projects/2019-2020/1/stages'
		);
		expect(response.status).toBe(200);
	});

	it('should be able to get a stage from a project by its number', async () => {
		await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/stages/')
			.send({ stage: { ...Stage } });
		const response = await request(app).get(
			'/courses/L079/units/26719/projects/2019-2020/1/stages/1'
		);
		expect(response.status).toBe(200);
	});

	it('should be able to update a stage', async () => {
		await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/stages/')
			.send({ stage: { ...Stage } });
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
		await request(app)
			.post('/courses/L079/units/26719/projects/2019-2020/1/stages/')
			.send({ stage: { ...Stage } });
		const response = await request(app).delete(
			'/courses/L079/units/26719/projects/2019-2020/1/stages/1'
		);
		expect(response.status).toBe(204);
	});
});
