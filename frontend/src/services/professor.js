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
		stage: async (course, unit, year, project, stage) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}/stages/${stage}`
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
		project: async (course, unit, year, project) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}/`
				);
				return response.data;
			} catch (error) {
				return error;
			}
		},
		teamMembers: async (course, unit, year, project, team) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/members`
				);
				return response.data;
			} catch (error) {
				return error;
			}
		},
		submission: async (course, unit, year, project, stage, team) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}/stages/${stage}/teams/${team}`
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

	update: {
		project: async (course, unit, academic_year, project, projectData) => {
			try {
				const response = await API.put(
					`courses/${course}/units/${unit}/projects/${academic_year}/${project}`,
					projectData
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		stage: async (course, unit, year, project, stage, stageData) => {
			try {
				const response = await API.put(
					`courses/${course}/units/${unit}/projects/${year}/${project}/stages/${stage}`,
					stageData
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		submission: async (course, unit, year, project, stage, team, data) => {
			try {
				const response = await API.put(
					`courses/${course}/units/${unit}/projects/${year}/${project}/stages/${stage}/teams/${team}`,
					data
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
	},

	remove: {
		stage: async (course, unit, year, project, stage) => {
			try {
				const response = await API.delete(
					`courses/${course}/units/${unit}/projects/${year}/${project}/stages/${stage}`
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
