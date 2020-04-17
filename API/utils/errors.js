module.exports = {
	LOGIN_REQUIRED: () => {
		const error = new Error();
		error.statusCode = 401;
		error.error = 'Unauthorized';
		error.message = 'You must be logged in';
		return error;
	},

	NO_ADMIN_PERMISSIONS: () => {
		const error = new Error();
		error.statusCode = 401;
		error.error = 'Unauthorized';
		error.message = 'You must be an admin';
		return error;
	},

	INVALID_IDENTITY: () => {
		const error = new Error();
		error.statusCode = 401;
		error.error = 'Unauthorized';
		error.message = "You don't have permissions to manage this resource";
		return error;
	},

	LOGIN_FAILED: () => {
		const error = new Error();
		error.statusCode = 401;
		error.error = 'Unauthorized';
		error.message = 'Wrong email or password';
		return error;
	},

	NOT_FOUND: () => {
		const error = new Error();
		error.statusCode = 404;
		error.error = 'Not Found';
		error.message = "Sorry, we can't find the page you were looking for.";
		return error;
	},

	COURSE_NOT_FOUND: (code, source) => {
		const error = new Error();
		error.statusCode = 404;
		error.error = 'Not Found';
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
		error.error = 'Not Found';
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
		error.error = 'Not Found';
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
		error.error = 'Not Found';
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
		error.error = 'Not Found';
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
		error.error = 'Not Found';
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
		error.error = 'Not Found';
		error.message = `The admin with the username ${username} was not found`;
		error.validation = {
			source,
			values: [username],
		};
		return error;
	},

	PROJECT_NOT_FOUND: (year, number, unit, source) => {
		const error = new Error();
		error.statusCode = 404;
		error.error = 'Not Found';
		error.message = `The project ${number} from ${year} from the unit ${unit} was not found`;
		error.validation = {
			source,
			values: [year, number, unit],
		};
		return error;
	},

	UNIQUE_CONSTRAIN: (detail) => {
		const error = new Error();
		error.statusCode = 409;
		error.error = 'Conflict';
		error.message = 'This field(s) must be unique in the database.';
		error.detail = detail;
		return error;
	},

	DB_DOWN: () => {
		const error = new Error('Service Unavailable');
		error.statusCode = 503;
		error.error = 'Service Unavailable';
		error.message =
			'Sorry, this service seems to be unavailable... Try again later';
		return error;
	},
};
