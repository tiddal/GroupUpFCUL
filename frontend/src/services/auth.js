import API from './api';

export default {
	authenticate: async (user) => {
		try {
			const response = await API.post('authenticate', { user });
			return response.data;
		} catch (error) {
			return error;
		}
	},
};
