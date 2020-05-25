import API from "./api";

export default {
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
