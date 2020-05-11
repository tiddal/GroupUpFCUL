import API from './api';

export default {
	authenticate: async (email, password) => {
		const response = await API.post('authenticate', {
			user: { email, password },
		});
		return response;
	},
};
