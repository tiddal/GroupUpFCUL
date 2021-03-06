import API from "./api";

export default {
  get: {
    admins: async () => {
      try {
        const response = await API.get("users/admins");
        return response.data;
      } catch (error) {
        return error;
      }
    },

    adminByUsername: async (username) => {
      try {
        const response = await API.get(`users/admins/${username}`);
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    professors: async () => {
      try {
        const response = await API.get("users/professors");
        return response.data;
      } catch (error) {
        return error;
      }
    },

    professorByUsername: async (username) => {
      try {
        const response = await API.get(`users/professors/${username}`);
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    professorsFromClass: async (
      number,
      academic_year,
      course_code,
      unit_code
    ) => {
      try {
        const response = await API.get(
          `courses/${course_code}/units/${unit_code}/classes/${academic_year}/${number}/professors`
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    students: async () => {
      try {
        const response = await API.get("users/students");
        return response.data;
      } catch (error) {
        return error;
      }
    },

    studentByUsername: async (username) => {
      try {
        const response = await API.get(`users/students/${username}`);
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    studentsFromClass: async (
      number,
      academic_year,
      course_code,
      unit_code
    ) => {
      try {
        const response = await API.get(
          `courses/${course_code}/units/${unit_code}/classes/${academic_year}/${number}/students`
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    courses: async () => {
      try {
        const response = await API.get("courses");
        return response.data;
      } catch (error) {
        return error;
      }
    },

    courseByCode: async (code) => {
      try {
        const response = await API.get(`courses/${code}`);
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    units: async () => {
      try {
        const response = await API.get("units");
        return response.data;
      } catch (error) {
        return error;
      }
    },

    unitsFromCourse: async (code) => {
      try {
        const response = await API.get(`courses/${code}/units`);
        return response.data;
      } catch (error) {
        return error;
      }
    },

    unitByCode: async (course_code, unit_code) => {
      try {
        const response = await API.get(
          `courses/${course_code}/units/${unit_code}`
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    classes: async (academic_year) => {
      try {
        const response = await API.get(`classes/${academic_year}`);
        return response.data;
      } catch (error) {
        return error;
      }
    },

    classesFromUnit: async (course_code, unit_code, academic_year) => {
      try {
        const response = await API.get(
          `courses/${course_code}/units/${unit_code}/classes/${academic_year}`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },

    classByNumber: async (number, academic_year, course_code, unit_code) => {
      try {
        const response = await API.get(
          `courses/${course_code}/units/${unit_code}/classes/${academic_year}/${number}`
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },
  },

  create: {
    user: async (user) => {
      try {
        const response = await API.post("users", { users: [user] });
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    course: async (course) => {
      try {
        const response = await API.post("courses", { courses: [course] });
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },
    unit: async (unit, course) => {
      try {
        const response = await API.post(`courses/${course}/units`, {
          units: [unit],
        });
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    class_: async (unit, course, class_) => {
      try {
        const response = await API.post(
          `courses/${course}/units/${unit}/classes/`,
          {
            classes: [class_],
          }
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },
    studentToClass: async (
      unit,
      course,
      class_number,
      academic_year,
      student
    ) => {
      try {
        const response = await API.post(
          `courses/${course}/units/${unit}/classes/${academic_year}/${class_number}/students`,
          {
            students: [student],
          }
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },
    professorToClass: async (
      unit,
      course,
      class_number,
      academic_year,
      professor
    ) => {
      try {
        const response = await API.post(
          `courses/${course}/units/${unit}/classes/${academic_year}/${class_number}/professors`,
          {
            professors: [professor],
          }
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },
  },

  edit: {
    user: async (user, username) => {
      try {
        const response = await API.put(`users/${username}`, { user });
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

    course: async (course, code) => {
      try {
        const response = await API.put(`courses/${code}`, { course });
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    unit: async (unit, course_code, unit_code) => {
      try {
        const response = await API.put(
          `courses/${course_code}/units/${unit_code}`,
          { unit }
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    class_: async (
      class_,
      class_number,
      course_code,
      unit_code,
      academic_year
    ) => {
      try {
        const response = await API.put(
          `courses/${course_code}/units/${unit_code}/classes/${academic_year}/${class_number}`,
          { class: class_ }
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },
  },

  remove: {
    user: async (username) => {
      try {
        const response = await API.delete(`users/${username}`);
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },
    course: async (code) => {
      try {
        const response = await API.delete(`courses/${code}`);
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    unit: async (course_code, unit_code) => {
      try {
        const response = await API.delete(
          `courses/${course_code}/units/${unit_code}`
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    class: async (academic_year, class_number, course_code, unit_code) => {
      try {
        const response = await API.delete(
          `courses/${course_code}/units/${unit_code}/classes/${academic_year}/${class_number}`
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    studentFromClass: async (
      course_code,
      unit_code,
      academic_year,
      class_number,
      username
    ) => {
      try {
        const response = await API.delete(
          `courses/${course_code}/units/${unit_code}/classes/${academic_year}/${class_number}/students/${username}`
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },

    professorFromClass: async (
      course_code,
      unit_code,
      academic_year,
      class_number,
      username
    ) => {
      try {
        const response = await API.delete(
          `courses/${course_code}/units/${unit_code}/classes/${academic_year}/${class_number}/professors/${username}`
        );
        return [response.data, response.status];
      } catch ({ response }) {
        return [response.data, response.status];
      }
    },
  },

  loadFile: {
    users: async (file) => {
      try {
        const response = await API.post("users", file, {
          headers: { "Content-Type": "application/json" },
        });
        return [response.data, response.status];
      } catch ({ response }) {
        if (!response)
          return ["Ficheiro alterado, faça o upload novamente.", 0];
        return [response.data, response.status];
      }
    },

    courses: async (file) => {
      try {
        const response = await API.post("courses", file, {
          headers: { "Content-Type": "application/json" },
        });
        return [response.data, response.status];
      } catch ({ response }) {
        if (!response)
          return ["Ficheiro alterado, faça o upload novamente.", 0];
        return [response.data, response.status];
      }
    },
  },
};
