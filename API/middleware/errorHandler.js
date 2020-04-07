const errors = require('../utils/errors');

const errorHandler = (error, request, response, next) => {
	if (error.status === undefined) error = errors.DB_DOWN();
	return response.status(error.status).json({ error });
};

module.exports = errorHandler;
