const error = require('../utils/errors');

const PageNotFound = (request, response, next) => next(error.NOT_FOUND());

module.exports = PageNotFound;
