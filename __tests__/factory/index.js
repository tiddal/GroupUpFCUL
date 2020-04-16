module.exports = {
	Student: {
		username: 'student',
		first_name: 'Student',
		last_name: 'Test',
		email: 'student@test.com',
		password: 'K0Zv4yQYnoKVvLj',
		role: {
			type: 'student',
			data: {},
		},
	},
	Professor: {
		username: 'professor',
		first_name: 'Professor',
		last_name: 'Test',
		email: 'professor@test.com',
		password: 'K0Zv4yQYnoKVvLj',
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
		email: 'admin@test.com',
		password: 'K0Zv4yQYnoKVvLj',
		role: {
			type: 'admin',
			data: {
				previleges: 1,
			},
		},
	},
};
