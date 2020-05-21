import API from './api';

export default {
	getStudents: async () => {
		try {
			const response = await API.get('users/students');
			return response.data;
		} catch (error) {
			return error;
		}
	},
	getProfessors: async () => {
		try {
			const response = await API.get('users/professors');
			return response.data;
		} catch (error) {
			return error;
		}
	},
	getAdmins: async () => {
		try {
			const response = await API.get('users/admins');
			return response.data;
		} catch (error) {
			return error;
		}
	},
	getCourses: async () => {
		try {
			const response = await API.get('courses');
			return response.data;
		} catch (error) {
			return error;
		}
	},
	createAdmin: async (admin) => {
		try {
			const response = await API.post('users', { users: [admin] });
			return [response.data, response.status];
		} catch ({ response }) {
			return [response.data, response.status];
		}
	},
};
