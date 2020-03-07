const errors = {
	LOGGIN_REQUIRED: () => {
		const error = new Error('Not Logged In');
		error.title = 'Not Logged In.';
		error.status = 401;
		error.detail = 'You must be logged in to access this resource.';
		return error;
	},
	NO_ADMIN_PERMISSIONS: () => {
		const error = new Error('Not an Admin');
		error.title = 'Not an Admin.';
		error.status = 401;
		error.detail = "You don't have admin previleges to access this resource.";
		return error;
	},
	NOT_FOUND: () => {
		const error = new Error('Not found');
		error.title = 'Not Found.';
		error.status = 404;
		error.detail = "Sorry, we can't find the page you were looking for.";
		return error;
	},
	DB_DOWN: () => {
		const error = new Error('Service Unavailable');
		error.title = 'Service Unavailable.';
		error.status = 503;
		error.detail =
			'Sorry, this service seems to be unavailable... Try again later.';
		return error;
	},
	USER_NOT_FOUND: () => {
		const error = new Error('User Not Found');
		error.title = 'User Not Found.';
		error.status = 404;
		error.detail = 'Sorry, that user does not exist in our system.';
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
		error.title = 'Validation Failed.';
		error.status = 422;
		error.detail = {
			field: err.path,
			message: err.message
		};
		return error;
	},
	USERNAME_EXISTS: (err) => {
		const error = new Error('Username Already Exists');
		error.title = 'Username Already Exists.';
		error.status = 409;
		error.detail = {
			field: 'username',
			message: 'This username is already in use.',
			value: err.value
		};
		return error;
	},
	EMAIL_EXISTS: (err) => {
		const error = new Error('Email Already Exists');
		error.title = 'Email Already Exists.';
		error.status = 409;
		error.detail = {
			field: 'email',
			message: 'This email address is already in use.',
			value: err.value
		};
		return error;
	}
};

module.exports = errors;
