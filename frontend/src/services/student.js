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
		team: async (course, unit, year, project, team) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}`
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
		teamRates: async (course, unit, year, project, team) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/members/rate`
				);
				return response.data;
			} catch (error) {
				return error;
			}
		},
		meetings: async (course, unit, year, project, team) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/meetings`
				);
				return response.data;
			} catch (error) {
				return error;
			}
		},
		meetingMembers: async (course, unit, year, project, team, meeting) => {
			try {
				const response = await API.get(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/meetings/${meeting}/members`
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
		submission: async (course, unit, year, project, stage, data) => {
			try {
				const response = await API.post(
					`courses/${course}/units/${unit}/projects/${year}/${project}/stages/${stage}/teams`,
					data
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		teamRate: async (course, unit, year, project, team, rate) => {
			try {
				const response = await API.post(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/members/rate`,
					{ rate }
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		meeting: async (course, unit, year, project, team, meeting) => {
			try {
				const response = await API.post(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/meetings`,
					meeting
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		meetingMember: async (course, unit, year, project, team, meeting) => {
			try {
				const response = await API.post(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/meetings/${meeting}/members`
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
	},

	update: {
		teamMember: async (course, unit, year, project, team, user, role) => {
			try {
				const response = await API.put(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/members/${user}`,
					role
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
		teamRate: async (course, unit, year, project, team, rate) => {
			try {
				const response = await API.put(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/members/rate`,
					{ rate }
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		meeting: async (course, unit, year, project, team, meeting, data) => {
			try {
				const response = await API.put(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/meetings/${meeting}`,
					data
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
		team: async (course, unit, year, project, team) => {
			try {
				const response = await API.delete(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}`
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		submission: async (course, unit, year, project, stage, team, id) => {
			try {
				const response = await API.delete(
					`courses/${course}/units/${unit}/projects/${year}/${project}/stages/${stage}/teams/${team}/${id}`
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		meeting: async (course, unit, year, project, team, meeting) => {
			try {
				const response = await API.delete(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/meetings/${meeting}`
				);
				return [response.data, response.status];
			} catch ({ response }) {
				return [response.data, response.status];
			}
		},
		meetingMember: async (course, unit, year, project, team, meeting) => {
			try {
				const response = await API.delete(
					`courses/${course}/units/${unit}/projects/${year}/${project}/teams/${team}/meetings/${meeting}/members`
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
