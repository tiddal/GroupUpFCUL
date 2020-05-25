import API from "./api";

export default {
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
