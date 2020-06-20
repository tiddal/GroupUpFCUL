import API from './api';

export default {
	get: {
		classes: async (professor, year, semester) => {
			try {
				const response = await API.get(
					`users/professors/${professor}/classes/${year}/${semester}`
				);
				return response.data;
			} catch (error) {
				return error;
			}
		},
		projects: async (course, unit, year) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}`
				);
				return response.data;
			} catch (error) {
				return error;
			}
		},
		stages: async (course, unit, year, project) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}/stages`
				);
				return response.data;
			} catch (error) {
				return error;
			}
		},
		submissions: async (course, unit, year, project, stage) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}/stages/${stage}/teams`
				);
				return response.data;
			} catch (error) {
				return error;
			}
		},
		teams: async (course, unit, year, project) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams`
				);
				return response.data;
			} catch (error) {
				return error;
			}
		},
	},

	create: {
		project: async (course, unit, project) => {
			try {
				const response = await API.post(
					`courses/${course}/units/${unit}/projects`,
					project
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		stage: async (course, unit, year, project, stage) => {
			try {
				const response = await API.post(
					`courses/${course}/units/${unit}/projects/${year}/${project}/stages`,
					stage
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
	},

	professorClasses: async (professor, year, semester) => {
		try {
			const response = await API.get(
				`/${professor}/classes/${year}/${semester}`
			);
			return response.data;
		} catch (error) {
			return error;
		}
	},
	find: async (professor) => {
		try {
			const response = await API.get(`/users/professors/${professor}`);
			return response.data;
		} catch (error) {
			return error;
		}
	},
	delete: async (professor) => {
		try {
			const response = await API.delete(`/users/professors/${professor}`);
			return response.data;
		} catch (error) {
			return error;
		}
	},
	edit: async (professor, newProfessor) => {
		try {
			const response = await API.put(`/users/professors/${professor}`, {
				newProfessor,
			});
			return response.data;
		} catch (error) {
			return error;
		}
	},
};
