const error = require('../utils/errors');

const PageNotFound = (req, res, next) => next(error.NOT_FOUND());

module.exports = PageNotFound;
