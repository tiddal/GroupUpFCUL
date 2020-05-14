const request = require('supertest');
const app = require('../../API/app');
const connection = require('../../API/db/config/connection');
const { LTI, Project, Class } = require('../factory');

describe('Project', () => {
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
			.post('/courses/L079/units/26719/projects/')
			.send({ project: Project })
			.set('Authorization', `Bearer ${professorToken}`);
	});

	afterAll(async () => {
		await connection.migrate.rollback();
		await connection.destroy();
	});

	it('should be able to create a new project', async () => {
		const response = await request(app)
			.post('/courses/L079/units/26719/projects/')
			.send({ project: Project })
			.set('Authorization', `Bearer ${professorToken}`);
		expect(response.status).toBe(201);
	});

	it('should be able to get all projects from a unit', async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719/projects/')
			.set('Authorization', `Bearer ${professorToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to get all projects from an academic year', async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719/projects/2019-2020')
			.set('Authorization', `Bearer ${professorToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to get a project by its id', async () => {
		const response = await request(app)
			.get('/courses/L079/units/26719/projects/2019-2020/1')
			.set('Authorization', `Bearer ${professorToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to update a project', async () => {
		const response = await request(app)
			.put('/courses/L079/units/26719/projects/2019-2020/1')
			.send({
				project: {
					name: 'Tudo',
					min_students: 2,
					max_students: 3,
					description: 'Everything',
					objectives: 'All',
					assingment_url: 'betterAssignment.pdf',
				},
			})
			.set('Authorization', `Bearer ${professorToken}`);
		expect(response.status).toBe(200);
	});

	it('should be able to delete a project', async () => {
		const response = await request(app)
			.delete('/courses/L079/units/26719/projects/2019-2020/1')
			.set('Authorization', `Bearer ${professorToken}`);
		expect(response.status).toBe(204);
	});
});
