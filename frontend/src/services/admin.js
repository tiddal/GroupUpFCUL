import API from "./api";

export default {
  getStudents: async () => {
    try {
      const response = await API.get("users/students");
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getProfessors: async () => {
    try {
      const response = await API.get("users/professors");
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getAdmins: async () => {
    try {
      const response = await API.get("users/admins");
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getAdminByUsername: async (username) => {
    try {
      const response = await API.get(`users/admins/${username}`);
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },
  getCourses: async () => {
    try {
      const response = await API.get("courses");
      return response.data;
    } catch (error) {
      return error;
    }
  },

  createCourse: async (course) => {
    try {
      const response = await API.post("courses", { courses: [course] });
      console.log(response.data);
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },

  loadCourseFile: async (file) => {
    try {
      const response = await API.post("courses", file, {
        headers: { "Content-Type": "application/json" },
      });
      return [response.data, response.status];
    } catch ({ response }) {
      if (!response) return ["Ficheiro alterado, faça o upload novamente.", 0];
      return [response.data, response.status];
    }
  },

  editCourse: async (course, code) => {
    try {
      const response = await API.put(`courses/${code}`, { course });
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },

  removeCourse: async (code) => {
    try {
      const response = await API.delete(`courses/${code}`);
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },

  getCourseByCode: async (code) => {
    try {
      const response = await API.get(`courses/${code}`);
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },

  createAdmin: async (admin) => {
    try {
      const response = await API.post("users", { users: [admin] });
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },
  editAdmin: async (user, username) => {
    try {
      const response = await API.put(`users/${username}`, { user });
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },

  getStudentByUsername: async (username) => {
    try {
      const response = await API.get(`users/students/${username}`);
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },
  getProfessorByUsername: async (username) => {
    try {
      const response = await API.get(`users/professors/${username}`);
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },
  createStudent: async (student) => {
    try {
      const response = await API.post("users", { users: [student] });
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },
  createProfessor: async (admin) => {
    try {
      const response = await API.post("users", { users: [admin] });
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },

  loadUserFile: async (file) => {
    try {
      const response = await API.post("users", file, {
        headers: { "Content-Type": "application/json" },
      });
      return [response.data, response.status];
    } catch ({ response }) {
      if (!response) return ["Ficheiro alterado, faça o upload novamente.", 0];
      return [response.data, response.status];
    }
  },

  editStudent: async (user, username) => {
    try {
      const response = await API.put(`users/${username}`, { user });
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },

  editProfessor: async (
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

  removeUser: async (username) => {
    try {
      const response = await API.delete(`users/${username}`);
      return [response.data, response.status];
    } catch ({ response }) {
      return [response.data, response.status];
    }
  },
  getUnits: async () => {
    try {
      const response = await API.get("units");
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getClasses: async () => {
    try {
      const response = await API.get("classes/2019-2020");
      return response.data;
    } catch (error) {
      return error;
    }
  },
};
