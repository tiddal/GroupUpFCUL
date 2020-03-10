const errorHandler = (error, req, res, next) =>
	res.status(error.status).json({ error });

module.exports = errorHandler;
