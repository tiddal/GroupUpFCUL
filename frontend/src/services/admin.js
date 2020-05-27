import API from './api';

export default {
	get: {
		admins: async () => {
			try {
				const response = await API.get('users/admins');
				return response.data;
			} catch (error) {
				return error;
			}
		},

		adminByUsername: async (username) => {
			try {
				const response = await API.get(`users/admins/${username}`);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},

		professors: async () => {
			try {
				const response = await API.get('users/professors');
				return response.data;
			} catch (error) {
				return error;
			}
		},

		professorByUsername: async (username) => {
			try {
				const response = await API.get(`users/professors/${username}`);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},

		students: async () => {
			try {
				const response = await API.get('users/students');
				return response.data;
			} catch (error) {
				return error;
			}
		},

		studentByUsername: async (username) => {
			try {
				const response = await API.get(`users/students/${username}`);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},

		courses: async () => {
			try {
				const response = await API.get('courses');
				return response.data;
			} catch (error) {
				return error;
			}
		},

		courseByCode: async (code) => {
			try {
				const response = await API.get(`courses/${code}`);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},

		units: async () => {
			try {
				const response = await API.get('units');
				return response.data;
			} catch (error) {
				return error;
			}
		},

		unitsFromCourse: async (code) => {
			try {
				const response = await API.get(`courses/${code}/units`);
				return response.data;
			} catch (error) {
				return error;
			}
		},

		unitByCode: async (course_code, unit_code) => {
			try {
				const response = await API.get(
					`courses/${course_code}/units/${unit_code}`
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},

		classes: async () => {
			try {
				const response = await API.get('classes/2019-2020');
				return response.data;
			} catch (error) {
				return error;
			}
		},
	},

	create: {
		user: async (user) => {
			try {
				const response = await API.post('users', { users: [user] });
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},

		course: async (course) => {
			try {
				const response = await API.post('courses', { courses: [course] });
				console.log(response.data);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		unit: async (unit, course) => {
			try {
				const response = await API.post(`courses/${course}/units`, {
					units: [unit],
				});
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
	},

	edit: {
		user: async (user, username) => {
			try {
				const response = await API.put(`users/${username}`, { user });
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},

		professor: async (
			{ first_name, last_name, email, department, room },
			username
		) => {
			try {
				await API.put(`users/${username}`, {
					user: { first_name, last_name, email },
				});
				const response = await API.put(`users/professors/${username}`, {
					professor: { department, room },
				});

				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},

		course: async (course, code) => {
			try {
				const response = await API.put(`courses/${code}`, { course });
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
	},

	remove: {
		user: async (username) => {
			try {
				const response = await API.delete(`users/${username}`);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		course: async (code) => {
			try {
				const response = await API.delete(`courses/${code}`);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
	},

	loadFile: {
		users: async (file) => {
			try {
				const response = await API.post('users', file, {
					headers: { 'Content-Type': 'application/json' },
				});
				return [response.data, response.status];
			} catch ({ response }) {
				if (!response)
					return ['Ficheiro alterado, faça o upload novamente.', 0];
				return [response.data, response.status];
			}
		},

		courses: async (file) => {
			try {
				const response = await API.post('courses', file, {
					headers: { 'Content-Type': 'application/json' },
				});
				return [response.data, response.status];
			} catch ({ response }) {
				if (!response)
					return ['Ficheiro alterado, faça o upload novamente.', 0];
				return [response.data, response.status];
			}
		},
	},
};
