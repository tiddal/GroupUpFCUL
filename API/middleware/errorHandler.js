const errors = require('../utils/errors');

const errorHandler = (error, req, res, next) => {
	if (error.status === undefined) error = errors.DB_DOWN();
	return res.status(error.status).json({ error });
};

module.exports = errorHandler;
