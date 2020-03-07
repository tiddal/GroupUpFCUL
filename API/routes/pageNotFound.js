const error = require('../utils/errors');

const pageNotFound = (req, res, next) => next(error.NOT_FOUND());

module.exports = pageNotFound;
