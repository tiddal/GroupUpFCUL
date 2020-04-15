const errors = require('../utils/errors');

const errorHandler = (error, request, response, next) => {
	if (error.statusCode === undefined) error = errors.DB_DOWN();
	return response.status(error.statusCode).json(error);
};

module.exports = errorHandler;
