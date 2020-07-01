import API from './api';

export default {
	get: {
		user: async (username) => {
			try {
				const response = await API.get(`users/${username}`);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		admin: async (username) => {
			try {
				const response = await API.get(`users/admins/${username}`);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},

		professor: async (username) => {
			try {
				const response = await API.get(`users/professors/${username}`);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},

		student: async (username) => {
			try {
				const response = await API.get(`users/students/${username}`);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
	},

	update: {
		user: async (username, data) => {
			try {
				const response = await API.put(`users/${username}`, data);
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
		student: async (username, data) => {
			try {
				const response = await API.put(`users/students/${username}`, data);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
	},
};
