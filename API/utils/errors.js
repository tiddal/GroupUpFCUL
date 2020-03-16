const errors = {
	LOGIN_REQUIRED: () => {
		const error = new Error('Not Logged In');
		error.title = 'Not Logged In';
		error.status = 401;
		error.detail = 'You must be logged in to access this resource.';
		return error;
	},
	NO_ADMIN_PERMISSIONS: () => {
		const error = new Error('Not an Admin');
		error.title = 'Not an Admin';
		error.status = 401;
		error.detail = "You don't have admin previleges to access this resource.";
		return error;
	},
	NOT_FOUND: () => {
		const error = new Error('Not found');
		error.title = 'Not Found';
		error.status = 404;
		error.detail = "Sorry, we can't find the page you were looking for.";
		return error;
	},
	DB_DOWN: () => {
		const error = new Error('Service Unavailable');
		error.title = 'Service Unavailable';
		error.status = 503;
		error.detail =
			'Sorry, this service seems to be unavailable... Try again later.';
		return error;
	},
	USER_NOT_FOUND: () => {
		const error = new Error('User Not Found');
		error.title = 'User Not Found';
		error.status = 404;
		error.detail = 'Sorry, that user does not exist in our system.';
		return error;
	},
	PROGRAM_NOT_FOUND: () => {
		const error = new Error('Program Not Found');
		error.title = 'Program Not Found';
		error.status = 404;
		error.detail = 'Sorry, that program does not exist in our system.';
		return error;
	},
	COURSE_NOT_FOUND: () => {
		const error = new Error('Course Not Found');
		error.title = 'Course Not Found';
		error.status = 404;
		error.detail = 'Sorry, that course does not exist in our system.';
		return error;
	},
	CLASS_NOT_FOUND: () => {
		const error = new Error('Class Not Found');
		error.title = 'Class Not Found';
		error.status = 404;
		error.detail = 'Sorry, that class does not exist in our system.';
		return error;
	},
	PROFESSOR_NOT_FOUND: () => {
		const error = new Error('Professor Not Found');
		error.title = 'Professor Not Found';
		error.status = 404;
		error.detail = 'Sorry, that professor does not exist in our system.';
		return error;
	},
	STUDENT_NOT_FOUND: () => {
		const error = new Error('Student Not Found');
		error.title = 'Student Not Found';
		error.status = 404;
		error.detail = 'Sorry, that student does not exist in our system.';
		return error;
	},
	INVALID_JSON: () => {
		const error = new Error('Invalid JSON');
		error.title = 'Invalid JSON';
		error.status = 400;
		error.detail =
			'Could not parse the given JSON. Make sure your JSON have all the requierd fields.';
		return error;
	},
	VALIDATION_FAILED: (err) => {
		const error = new Error('Validation Failed');
		error.title = 'Validation Failed';
		error.status = 422;
		error.detail = {
			field: err.path,
			message: err.message,
			instance: err.instance
		};
		return error;
	},
	UNIQUE_CONSTRAIN: (err) => {
		const error = new Error('Unique Constrain Error');
		error.title = 'Duplicate Entry';
		error.status = 409;
		error.detail = {
			message: 'This field(s) must be unique in the database.',
			value: err.value
		};
		return error;
	},
	INVALID_IDENTITY: () => {
		const error = new Error('Invalid Identity');
		error.title = 'Invalid Identity';
		error.status = 401;
		error.detail = "You don't have permissions to manage other users accounts";
		return error;
	},
	LOGIN_FAILED: () => {
		const error = new Error('Failed to Log In');
		error.title = 'Failed to Log In';
		error.status = 401;
		error.detail = 'Wrong email or password.';
		return error;
	}
};

module.exports = errors;
