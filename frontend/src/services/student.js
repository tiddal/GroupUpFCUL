import API from './api';

export default {
	get: {
		classes: async (student, year, semester) => {
			try {
				const response = await API.get(
					`users/students/${student}/classes/${year}/${semester}`
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
		project: async (course, unit, year, project) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}`
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
	},
	create: {
		team: async (course, unit, year, project) => {
			try {
				const response = await API.post(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams`
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		teamMember: async (course, unit, year, project, team) => {
			try {
				const response = await API.post(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/members`
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
	},

	remove: {
		teamMember: async (course, unit, year, project, team, user) => {
			try {
				const response = await API.delete(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/members/${user}`
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
	},
	studentClasses: async (student, year, semester) => {
		try {
			const response = await API.get(`/${student}/classes/${year}/${semester}`);
			return response.data;
		} catch (error) {
			return error;
		}
	},
	find: async (student) => {
		try {
			const response = await API.get(`/users/students/${student}`);
			return response.data;
		} catch (error) {
			return error;
		}
	},
	delete: async (student) => {
		try {
			const response = await API.delete(`/users/students/${student}`);
			return response.data;
		} catch (error) {
			return error;
		}
	},
	edit: async (student, newstudent) => {
		try {
			const response = await API.put(`/users/students/${student}`, {
				newstudent,
			});
			return response.data;
		} catch (error) {
			return error;
		}
	},
};
