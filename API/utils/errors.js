module.exports = {
  LOGIN_REQUIRED: () => {
    const error = new Error();
    error.statusCode = 401;
    error.error = "Unauthorized";
    error.message = "You must be logged in";
    return error;
  },

  NO_ADMIN_PERMISSIONS: () => {
    const error = new Error();
    error.statusCode = 401;
    error.error = "Unauthorized";
    error.message = "You must be an admin";
    return error;
  },

  NO_PROFESSOR_PERMISSIONS: () => {
    const error = new Error();
    error.statusCode = 401;
    error.error = "Unauthorized";
    error.message = "You must be a professor";
    return error;
  },

  INVALID_IDENTITY: () => {
    const error = new Error();
    error.statusCode = 401;
    error.error = "Unauthorized";
    error.message = "You don't have permissions to manage this resource";
    return error;
  },

  LOGIN_FAILED: () => {
    const error = new Error();
    error.statusCode = 401;
    error.error = "Unauthorized";
    error.message = "Wrong email or password";
    return error;
  },

  NOT_FOUND: () => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = "Sorry, we can't find the page you were looking for.";
    return error;
  },

  COURSE_NOT_FOUND: (code, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The course with the code ${code} was not found`;
    error.validation = {
      source,
      values: [code],
    };
    return error;
  },

  UNIT_NOT_FOUND: (code, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The unit with the code ${code} was not found`;
    error.validation = {
      source,
      values: [code],
    };
    return error;
  },

  CLASS_NOT_FOUND: (number, year, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The class ${number} from ${year} was not found`;
    error.validation = {
      source,
      values: [number, year],
    };
    return error;
  },

  USER_NOT_FOUND: (username, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The user with the username ${username} was not found`;
    error.validation = {
      source,
      values: [username],
    };
    return error;
  },

  PROFESSOR_NOT_FOUND: (username, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The professor with the username ${username} was not found`;
    error.validation = {
      source,
      values: [username],
    };
    return error;
  },

  STUDENT_NOT_FOUND: (username, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The student with the username ${username} was not found`;
    error.validation = {
      source,
      values: [username],
    };
    return error;
  },

  ADMIN_NOT_FOUND: (username, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The admin with the username ${username} was not found`;
    error.validation = {
      source,
      values: [username],
    };
    return error;
  },

  PROJECT_NOT_FOUND: (year, number, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The project ${number} from ${year} was not found`;
    error.validation = {
      source,
      values: [year, number, unit],
    };
    return error;
  },

  TEAM_NOT_FOUND: (number, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The team ${number} was not found`;
    error.validation = {
      source,
      values: [number],
    };
    return error;
  },

  STAGE_NOT_FOUND: (number, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The Stage ${number} was not found`;
    error.validation = {
      source,
      values: [number],
    };
    return error;
  },

  STUDENT_NOT_IN_UNIT: (username) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The user ${username} was not found in this unit`;
    error.validation = {
      values: [username],
    };
    return error;
  },

  MAX_MEMBERS_REACHED: (members) => {
    const error = new Error();
    error.statusCode = 401;
    error.error = "Unauthorized";
    error.message = `This project doesn't allow more than ${members} members`;
    error.validation = {
      values: [members],
    };
    return error;
  },

  ALREADY_IN_TEAM: (number) => {
    const error = new Error();
    error.statusCode = 400;
    error.error = "Bad Request";
    error.message = `You are already in a team for this project`;
    error.validation = {
      values: [number],
    };
    return error;
  },

  MEETING_NOT_FOUND: (number, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The Meeting ${number} was not found`;
    error.validation = {
      source,
      values: [number],
    };
    return error;
  },

  TASK_NOT_FOUND: (number, source) => {
    const error = new Error();
    error.statusCode = 404;
    error.error = "Not Found";
    error.message = `The Task ${number} was not found`;
    error.validation = {
      source,
      values: [number],
    };
    return error;
  },

  UNIQUE_CONSTRAIN: (detail) => {
    const error = new Error();
    error.statusCode = 409;
    error.error = "Conflict";
    error.message = "This field(s) must be unique in the database.";
    error.detail = detail;
    return error;
  },

  INVALID_BODY: (properties) => {
    const error = new Error();
    error.statusCode = 400;
    error.error = "Bad Request";
    error.message = `Missing properties`;
    error.validation = {
      source: [...properties],
    };
    return error;
  },

  DB_DOWN: () => {
    const error = new Error("Service Unavailable");
    error.statusCode = 503;
    error.error = "Service Unavailable";
    error.message =
      "Sorry, this service seems to be unavailable... Try again later";
    return error;
  },
};
