module.exports = {
	Student: {
		username: 'student',
		first_name: 'Student',
		last_name: 'Test',
		email: 'student2@test.com',
		password: 'password',
		role: {
			type: 'student',
			data: {},
		},
	},
	Professor: {
		username: 'professor',
		first_name: 'Professor',
		last_name: 'Test',
		email: 'professor2@test.com',
		password: 'password',
		role: {
			type: 'professor',
			data: {
				room: '1.1.1',
				department: 'DI',
			},
		},
	},
	Admin: {
		username: 'admin',
		first_name: 'Admin',
		last_name: 'Test',
		email: 'admin2@test.com',
		password: 'password',
		role: {
			type: 'admin',
			data: {
				previleges: 1,
			},
		},
	},

	LTI: {
		code: 'L079',
		name: 'Tecnologias de Informação',
		cycle: 1,
		initials: 'LTI',
		units: [
			{
				code: 26719,
				name: 'Projeto de Tecnologias de Informação',
				semester: 2,
				initials: 'PTI',
				ects: 6,
			},
		],
	},

	LEI: {
		code: '9119',
		name: 'Engenharia Informática',
		cycle: 1,
		initials: 'LEI',
		units: [
			{
				code: 26737,
				name: 'Teoria da Computação',
				semester: 1,
				initials: 'TC',
				ects: 6,
			},
		],
	},

	Unit: {
		code: 11111,
		name: 'Unit One',
		semester: 1,
		initials: 'U1',
		ects: 6,
	},

	Class: {
		number: 'T1',
		begins_at: '10:30',
		ends_at: '12:00',
		week_day: 2,
		academic_year: '2019-2020',
	},

	Project: {
		name: 'Nada',
		min_students: 1,
		max_students: 2,
		description: 'Nothing',
		objectives: 'None',
		assignment_url: 'assignment.pdf',
		stages: [
			{
				description: 'Fazer absolutamente nada',
				start_date: '01-03-2019',
				end_date: '02-04-2019',
				weight: 1,
			},
		],
	},

	Stage: {
		description: 'Fazer absolutamente nada',
		start_date: '01-03-2019',
		end_date: '02-04-2019',
		weight: 1,
	},

	Meeting: {
		topic: 'Como ter o 19,9 em menos de 24h',
		begins_at: '02-03-2019 16:30',
		ends_at: '02-03-2019 17:00',
	},

	Task: {
		title: 'Nadinha',
		description: 'O projeto é fazer nada então não fazemos nada',
		start_date: '01-03-2019',
		end_date: '02-04-2019',
	},
};
